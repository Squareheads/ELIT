import * as Collections from 'typescript-collections'

export default class ZKillStatisticsFetcher implements IZKillStatisticsFetcher {

  connectionManager: IConnectionManager

  constructor(connectionManager: IConnectionManager) {
    this.connectionManager = connectionManager
  }

  async fetchStatistics(characterIds: number[]): Promise<Collections.Dictionary<number, IZKillStatisticsItem>> {
    return new Promise<Collections.Dictionary<number, IZKillStatisticsItem>>(async (resolve, reject) => {
      try {
        const promises = characterIds.map((characterId: number) => {
          return this.fetchSingleCharacterStatistics(characterId)
        })

        const results = await Promise.all(promises)

        const dictionary = new Collections.Dictionary<number, IZKillStatisticsItem>()

        results.forEach((result: IZKillStatisticsItem) => {
          dictionary.setValue(result.characterId, result)
        })
        resolve(dictionary)
      } catch (reason) {
        reject(reason)
      }
    })
  }

  private async fetchSingleCharacterStatistics(characterId: number): Promise<IZKillStatisticsItem> {
    return new Promise<IZKillStatisticsItem>(async (resolve, reject) => {
      try {
        const URL = 'https://zkillboard.com/api/stats/characterID/' + characterId + '/'
        const data = await this.connectionManager.get(URL)
        const object = JSON.parse(data)

        resolve({
          characterId: characterId,
          dangerRatio: object['dangerRatio'],
          gangRatio: object['gangRatio']
        })
      } catch (reason) {
        reject(reason)
      }
    })
  }
}
