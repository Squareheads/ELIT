import * as Collections from 'typescript-collections'

export default class KillDataViewModelProvider implements IKillDataViewModelProvider {

  affiliationResolver: ICharacterAffiliationResolver
  statisticsFetcher: IZKillStatisticsFetcher

  constructor(affiliationResolver: ICharacterAffiliationResolver, statisticsFetcher: IZKillStatisticsFetcher) {
    this.affiliationResolver = affiliationResolver
    this.statisticsFetcher = statisticsFetcher
  }

  async viewModel(data: ICharacterKillData[]): Promise<IKillDataViewModel> {

    return new Promise<IKillDataViewModel>(async (resolve, _reject) => {
      const characterIDs = data.map((kill): number => {
        return kill.id
      })

      const affiliations: Collections.Dictionary<number,ICharacterAffiliationInfo> = await this.affiliationResolver.getAffiliations(characterIDs)

      const characters: ICharacterKillDataViewModel[] = data.map((value: ICharacterKillData): ICharacterKillDataViewModel => {
        return this.characterViewModel(value, affiliations)
      })

      const charactersInAlliance = characters.filter((character) => {
        return character.allianceName === ''
      })
      .sort((a, b): number => {
        return (a.allianceName || '') > (b.allianceName || '') ? -1 : 1
      })

      const charactersNotInAlliance = characters.filter((character) => {
        return character.allianceName !== ''
      })
      .sort((a, b): number => {
        return (a.corpName || '') > (b.corpName || '') ? -1 : 1
      })
      const orderedCharacters = charactersInAlliance.concat(charactersNotInAlliance)

      const zkillStatistics: Collections.Dictionary<number, IZKillStatisticsItem> = await this.statisticsFetcher.fetchStatistics(characterIDs)

      orderedCharacters.forEach((character) => {
        character.dangerRatio = zkillStatistics.getValue(character.id).dangerRatio
        character.gangRatio = zkillStatistics.getValue(character.id).gangRatio
      })
      const viewModel: IKillDataViewModel = {
        characters: orderedCharacters
      }
      resolve(viewModel)
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

  private characterViewModel(characterKillData: ICharacterKillData, affiliations: Collections.Dictionary<number,ICharacterAffiliationInfo>): ICharacterKillDataViewModel {
    const flownFromKills = this.flownShipsFromKillData(characterKillData)
    const flownFromLosses = this.flownShipsFromLossData(characterKillData)
    let combinedKills = new Collections.Dictionary<string, number>()
    flownFromLosses.forEach((shipName, flownCount) => {
      const currentValue = combinedKills.getValue(shipName) || 0
      combinedKills.setValue(shipName, currentValue + flownCount)
    })

    flownFromKills.forEach((shipName, flownCount) => {
      const currentValue = combinedKills.getValue(shipName) || 0
      combinedKills.setValue(shipName, currentValue + flownCount)
    })

    const mapped = combinedKills.keys().map((key: string): {key: string, value: number} => {
      return {
        key: key,
        value: combinedKills.getValue(key)
      }
    }).filter((ship): boolean => {
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
        losses: flownFromLosses.getValue(value.key) || 0
      }
    })
    const corpName = affiliations.getValue(characterKillData.id).corporationName
    const allianceName = affiliations.getValue(characterKillData.id).allianceName
    return {
      id: characterKillData.id,
      name: characterKillData.name,
      corpName: corpName,
      allianceName: allianceName,
      characterImageURL: 'https://image.eveonline.com/Character/' + characterKillData.id + '_256.jpg',
      flownShips: orderedFlownShips
    }
  }
}
