export class CharacterLookup implements ICharacterLookup {

  private idResolver: ICharacterIDResolver
  private killFetcher: IKillFetcher

  constructor(idResolver: ICharacterIDResolver,
    killFetcher: IKillFetcher) {
    this.killFetcher = killFetcher
    this.idResolver = idResolver
  }

  async lookupCharacters(text: string): Promise<ICharacterKillData[]> {
    let splitNames = this.splitNames(text)
    return new Promise<ICharacterKillData[]>(async (resolve, reject) => {

      try {

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
