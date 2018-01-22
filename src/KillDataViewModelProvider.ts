import * as Collections from 'typescript-collections'
import { InterestingDataPointType } from './InterestingDataPointType'

export default class KillDataViewModelProvider implements IKillDataViewModelProvider {

  affiliationResolver: ICharacterAffiliationResolver
  statisticsFetcher: IZKillStatisticsFetcher

  constructor(affiliationResolver: ICharacterAffiliationResolver, statisticsFetcher: IZKillStatisticsFetcher) {
    this.affiliationResolver = affiliationResolver
    this.statisticsFetcher = statisticsFetcher
  }

  async viewModel(data: ICharacterKillData[]): Promise<IKillDataViewModel> {
    return new Promise<IKillDataViewModel>(async (resolve, reject) => {
      try {
        if (data.length === 0) {
          resolve({ characters: [] })
          return
        }
        const characterIDs = data.map((kill): number => {
          return kill.id
        })

        const affiliations: Collections.Dictionary<number,ICharacterAffiliationInfo> = await this.affiliationResolver.getAffiliations(characterIDs)

        const characters: ICharacterKillDataViewModel[] = data.map((value: ICharacterKillData): ICharacterKillDataViewModel => {
          return this.characterViewModel(value, affiliations)
        })

        const charactersInAlliance = characters.filter((character) => {
        return character.allianceName !== undefined && character.allianceName !== ''
      })
      .sort((a, b): number => {
        return (a.allianceName || '') > (b.allianceName || '') ? -1 : 1
      })

        const charactersNotInAlliance = characters.filter((character) => {
        return character.allianceName === undefined || character.allianceName === ''
      })
      .sort((a, b): number => {
        return (a.corpName || '') > (b.corpName || '') ? -1 : 1
      })

        const orderedCharacters: ICharacterKillDataViewModel[] = [].concat.apply(charactersInAlliance, charactersNotInAlliance)
        const zkillStatistics: Collections.Dictionary<number, IZKillStatisticsItem> = await this.statisticsFetcher.fetchStatistics(characterIDs)
        orderedCharacters.forEach((character) => {
          const theCharacter = zkillStatistics.getValue(character.id)
          if (theCharacter) {
            character.dangerRatio = theCharacter.dangerRatio
            character.gangRatio = theCharacter.gangRatio
          }
        })

        const viewModel: IKillDataViewModel = {
          characters: orderedCharacters
        }
        resolve(viewModel)
      } catch (reason) {
        reject(reason)
      }
    })
  }

  private flownShipsFromKillData(characterKillData: ICharacterKillData): Collections.Dictionary<string, number> {

    let flown = new Collections.Dictionary<string, number>()
    characterKillData.kills.forEach((element: ICharacterKillmail) => {
      const myAttackerEntry = element.attackers.filter((attacker: ICharacterKillmailAttacker): boolean => {
        const isMe = attacker.characterName === characterKillData.name
        return isMe
      })

      if (myAttackerEntry.length === 1) {
        const currentCount = flown.getValue(myAttackerEntry[0].shipType) || 0

        flown.setValue(myAttackerEntry[0].shipType, currentCount + 1)
      }
    })

    return flown
  }

  private flownShipsFromLossData(characterKillData: ICharacterKillData): Collections.Dictionary<string, number> {

    let flown = new Collections.Dictionary<string, number>()
    characterKillData.losses.forEach((element: ICharacterKillmail) => {
      const isMe = element.victim.characterName === characterKillData.name

      if (isMe) {
        const ship = element.victim.shipType
        const currentCount = flown.getValue(ship) || 0
        flown.setValue(ship, currentCount + 1)
      }
    })

    return flown
  }

  private dataPointsContainType(points: IInterestingDataPoint[], type: InterestingDataPointType): boolean {
    return points.filter((eachPoint): boolean => {
      return eachPoint.type === type
    }).length !== 0
  }

  private dataPointsForCharacter(_characterKillData: ICharacterKillData): IInterestingDataPoint[] {
    let points: IInterestingDataPoint[] = []

    _characterKillData.losses.forEach((loss) => {
      loss.victim.items.forEach((item) => {
        if (item.itemType === 'Cynosural Field Generator I' && !this.dataPointsContainType(points, InterestingDataPointType.UsesCyno)) {
          points.push({ type: InterestingDataPointType.UsesCyno, image: 'https://image.eveonline.com/Type/' + item.itemTypeID + '_64.png' })
        }
        if (item.itemType === 'Covert Cynosural Field Generator I' && !this.dataPointsContainType(points, InterestingDataPointType.UsesCovertCyno)) {
          points.push({ type: InterestingDataPointType.UsesCovertCyno, image: 'https://image.eveonline.com/Type/' + item.itemTypeID + '_64.png' })
        }
      })
    })

    return points
  }

  private characterViewModel(characterKillData: ICharacterKillData, affiliations: Collections.Dictionary<number,ICharacterAffiliationInfo>): ICharacterKillDataViewModel {
    const flownFromKills = this.flownShipsFromKillData(characterKillData)
    const flownFromLosses = this.flownShipsFromLossData(characterKillData)
    let combinedKills = new Collections.Dictionary<string, number>()
    flownFromLosses.forEach((shipName: string, flownCount: number) => {
      const currentValue = combinedKills.getValue(shipName) || 0
      combinedKills.setValue(shipName, currentValue + flownCount)
    })

    flownFromKills.forEach((shipName: string, flownCount: number) => {
      const currentValue = combinedKills.getValue(shipName) || 0
      combinedKills.setValue(shipName, currentValue + flownCount)
    })

    const mapped: {key: string, value: number}[] = combinedKills.keys().map((key: string): {key: string, value: number} => {
      return {
        key: key,
        value: combinedKills.getValue(key)
      }
    }).filter((ship: {key: string, value: number}): boolean => {
      return ship.key !== 'Capsule'
    })

    const sorted = mapped.sort((a, b): number => {
      return a.value > b.value ? -1 : 1
    })

    const orderedFlownShips = sorted.map((value): IFlownShip => {
      return {
        name: value.key,
        count: value.value,
        killsWhileFlying: flownFromKills.getValue(value.key) || 0,
        losses: flownFromLosses.getValue(value.key) || 0,
        id: 0
      }
    })
    let corpName: string = ''
    if (affiliations.getValue(characterKillData.id) && affiliations.getValue(characterKillData.id).corporationName) {
      corpName = affiliations.getValue(characterKillData.id).corporationName || ''
    }
    let allianceName: string = ''
    if (affiliations.getValue(characterKillData.id) && affiliations.getValue(characterKillData.id).allianceName) {
      allianceName = affiliations.getValue(characterKillData.id).allianceName || ''
    }

    return {
      id: characterKillData.id,
      name: characterKillData.name,
      corpName: corpName,
      allianceName: allianceName,
      characterImageURL: 'https://image.eveonline.com/Character/' + characterKillData.id + '_256.jpg',
      flownShips: orderedFlownShips,
      interestingDataPoints: this.dataPointsForCharacter(characterKillData)
    }
  }
}
