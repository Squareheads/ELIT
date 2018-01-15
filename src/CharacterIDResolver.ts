import { PostUniverseIdsCharacter, PostUniverseNames200Ok } from 'eve-online-esi'

export class CharacterIDResolver implements ICharacterIDResolver {

  private universeApi: IUniverseApi
  private characterNameIDStore: INameIDStore

  constructor(characterNameIDStore: INameIDStore, universeApi: IUniverseApi) {
    this.characterNameIDStore = characterNameIDStore
    this.universeApi = universeApi
  }

  async resolveIDs(IDs: number[]): Promise<IResolvedCharacter[]> {
    const returningPromise = new Promise<IResolvedCharacter[]>(async (resolve, reject) => {
      try {
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
        const response = await this.universeApi.postUniverseNames(idsExcludingCached)
        const characters: Array<PostUniverseNames200Ok> = response.body

        let resolvedCharacters: IResolvedCharacter[] = characters.map((character) => {
        return { name: character.name, id: character.id || 0 }
      }).filter((character: IResolvedCharacter) => {
        return character.id !== 0
      })
        this.characterNameIDStore.store(resolvedCharacters)
        resolve(cachedResolvedCharacters.concat(resolvedCharacters))
      } catch (reason) {
        reject(reason)
      }
    })

    return returningPromise
  }

  async resolveNames(name: string[]): Promise < IResolvedCharacter[] > {

    return new Promise<IResolvedCharacter[]>(async (resolve, reject) => {

      try {
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

        const esiIds = await this.universeApi.postUniverseIds(namesExcludingCached)
        const characters: Array<PostUniverseIdsCharacter> = esiIds.body.characters || []

        let resolvedCharacters = characters.map((character) => {
          return { name: character.name, id: character.id }
        }).filter((character) => {
          return character.id !== 0
        })

        this.characterNameIDStore.store(resolvedCharacters)
        resolve(cachedResolvedCharacters.concat(resolvedCharacters))

      } catch (error) {
        reject('resolveNames failed: ' + JSON.stringify(error))
      }
    })
  }
}
