export class CharacterIDResolver implements ICharacterIDResolver {

  apiStore: IAPITokenStore
  connectionManager: IConnectionManager
  characterNameIDStore: INameIDStore
  constructor(apiStore: IAPITokenStore, connectionManager: IConnectionManager, characterNameIDStore: INameIDStore) {
    this.apiStore = apiStore
    this.connectionManager = connectionManager
    this.characterNameIDStore = characterNameIDStore
  }
  async resolveIDs(IDs: number[]): Promise<IResolvedCharacter[]> {
    const returningPromise = new Promise<IResolvedCharacter[]>(async (resolve, _reject) => {
      const cachedCharacters = await this.characterNameIDStore.getValuesByID(IDs)
      const cachedIDs = cachedCharacters.map((resolved: IResolvedCharacter): number => {
        return resolved.id
      })
      const cachedResolvedCharacters = cachedCharacters.map((cachedID: INameIDStorable): IResolvedCharacter => {
        return { id: cachedID.id, name: cachedID.name }
      })

      const idsExcludingCached = IDs.filter((value: number): boolean => {
        const containsId = cachedIDs.indexOf(value) !== -1
        return !containsId
      })

      if (idsExcludingCached.length === 0) {
        resolve(cachedResolvedCharacters)
        return
      }

      let chunkedIDs = []
      while (idsExcludingCached.length > 0) {
        chunkedIDs.push(idsExcludingCached.splice(0,50))
      }

      const promises = chunkedIDs.map((chunk: number[]): Promise<IResolvedCharacter[]> => {
        return this.resolveChunkedIDs(chunk)
      })

      const result = await Promise.all(promises)
      const resolvedCharacters = [].concat.apply([], result)
      resolve(resolvedCharacters)

    })

    return returningPromise

  }

  async resolveNames(name: string[]): Promise<IResolvedCharacter[]> {
    const X2JS = require('x2js')
    const x2js = new X2JS()

    return new Promise<IResolvedCharacter[]>(async (resolve, reject) => {

      try {
        const token = await this.apiStore.getToken()
        const cachedIDs = await this.characterNameIDStore.getValuesByName(name)
        const cachedNames = cachedIDs.map((resolved: IResolvedCharacter): string => {
          return resolved.name
        })

        const namesExcludingCached = name.filter((value: string): boolean => {
          const containsName = cachedNames.indexOf(value) !== -1
          return !containsName
        })
        const cachedResolvedCharacters = cachedIDs.map((cachedID: INameIDStorable): IResolvedCharacter => {
          return { id: cachedID.id, name: cachedID.name }
        })

        if (namesExcludingCached.length === 0) {
          resolve(cachedResolvedCharacters)
          return
        }

        let names = namesExcludingCached.join(',')
        let URL = this.buildURL(token, names)
        let response = await this.connectionManager.get(URL)
        let document: any = x2js.xml2js(response)
        let rows: any
        rows = document.eveapi.result.rowset.row

        if (rows.constructor !== Array) {
          rows = [document.eveapi.result.rowset.row]
        }
        let resolvedCharacters: IResolvedCharacter[] = rows.map((row: any) => {
          return { name: row._name, id: Number(row._characterID) || 0 }
        }).filter((character: IResolvedCharacter) => {
          return character.id !== 0
        })
        this.characterNameIDStore.store(resolvedCharacters)

        resolve(cachedResolvedCharacters.concat(resolvedCharacters))

      } catch (error) {
        reject('resolveNames failed: ' + error)
      }
    })
  }

  private async resolveChunkedIDs(IDs: number[]): Promise<IResolvedCharacter[]> {
    const X2JS = require('x2js')
    const x2js = new X2JS()

    return new Promise<IResolvedCharacter[]>(async (resolve, reject) => {
      try {
        const token = await this.apiStore.getToken()
        let idsToFetch = IDs.join(',')

        let URL = this.buildURLByIDs(token, idsToFetch)
        let response = await this.connectionManager.get(URL)
        let document: any = x2js.xml2js(response)
        let rows: any
        rows = document.eveapi.result.rowset.row

        if (rows.constructor !== Array) {
          rows = [document.eveapi.result.rowset.row]
        }
        let resolvedCharacters: IResolvedCharacter[] = rows.map((row: any) => {
          return { name: row._name, id: Number(row._characterID) || 0 }
        }).filter((character: IResolvedCharacter) => {
          return character.id !== 0
        })
        this.characterNameIDStore.store(resolvedCharacters)
        resolve(resolvedCharacters)

      } catch (error) {
        reject('resolveChunkedIDs failed: ' + error)
      }
    })
  }

  private buildURL(token: IAPIToken, names: string): string {
    let baseURL: string = 'https://api.eveonline.com'
    let URI: string = '/eve/CharacterID.xml.aspx'
    let parameters: string = '?keyID=' + token.keyID + '&vCode=' + token.verificationCode + '&names=' + names
    let URL = baseURL + URI + parameters

    return URL
  }

  private buildURLByIDs(token: IAPIToken, IDs: string): string {
    let baseURL: string = 'https://api.eveonline.com'
    let URI: string = '/eve/CharacterName.xml.aspx'
    let parameters: string = '?keyID=' + token.keyID + '&vCode=' + token.verificationCode + '&ids=' + IDs
    let URL = baseURL + URI + parameters
    return URL
  }
}
