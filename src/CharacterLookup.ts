export class CharacterLookup implements ICharacterLookup {

  apiStore: IAPITokenStore
  idResolver: ICharacterIDResolver
  killFetcher: IKillFetcher

  constructor(apiStore: IAPITokenStore,
    idResolver: ICharacterIDResolver,
    killFetcher: IKillFetcher) {
    this.killFetcher = killFetcher
    this.apiStore = apiStore
    this.idResolver = idResolver
  }

  async lookupCharacters(text: string): Promise<ICharacterKillData[]> {
    let splitNames = this.splitNames(text)
    return new Promise<ICharacterKillData[]>(async (resolve, reject) => {

      try {
        await this.apiStore.getToken()

        let ids: IResolvedCharacter[] = await this.idResolver.resolveNames(splitNames)

        let kills: ICharacterKillData[] = await this.killFetcher.getKills(ids)
        resolve(kills)
      } catch (error) {
        reject('lookupCharacters failed: ' + error)
      }
    })
  }

  private splitNames(names: string): string[] {
    if (!names.indexOf('\n')) {
      return [names]
    }
    return names.split('\n')
  }
}
