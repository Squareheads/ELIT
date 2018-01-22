import 'mocha'
import * as chai from 'chai'
import KillDataViewModelProvider from '../src/KillDataViewModelProvider'
import { MockCharacterAffiliationResolver, MockZKillStatisticsFetcher } from '../mocks/mocks'
import { TestHelpers } from './TestHelpers'
import Dictionary from 'typescript-collections/dist/lib/Dictionary'

describe('KillDataViewModelProvider', () => {
  const affilationResolver = new MockCharacterAffiliationResolver()
  const statisticsFetcher = new MockZKillStatisticsFetcher()
  const provider: IKillDataViewModelProvider = new KillDataViewModelProvider(affilationResolver, statisticsFetcher)
  affilationResolver.affiliationsToReturn = new Dictionary<number, ICharacterAffiliationInfo>()
  statisticsFetcher.statisticsToReturn = new Dictionary<number, IZKillStatisticsItem>()

  it('Provides a view model for kill data', async () => {
    const killData: ICharacterKillData[] = [
      {
        id: 1,
        name: 'kellyl',
        kills: [],
        losses: []
      },
      {
        id: 2,
        name: 'sp4m',
        kills: [],
        losses: []
      }
    ]
    let viewModel: IKillDataViewModel
    viewModel = await provider.viewModel(killData)
    chai.assert.equal(viewModel.characters.length, 2)
    chai.assert.equal(viewModel.characters[0].id, 2)
    chai.assert.equal(viewModel.characters[0].name, 'sp4m')
    chai.assert.equal(viewModel.characters[0].characterImageURL, 'https://image.eveonline.com/Character/2_256.jpg')
    chai.assert.equal(viewModel.characters[1].id, 1)
    chai.assert.equal(viewModel.characters[1].name, 'kellyl')
    chai.assert.equal(viewModel.characters[1].characterImageURL, 'https://image.eveonline.com/Character/1_256.jpg')

  }),
  it('calculates recent flown ships from kills', async () => {
    const kills = [
      TestHelpers.killData('Kellyl', 'Enyo', 'Taranis', 'Some Duder 1'),
      TestHelpers.killData('Kellyl', 'Merlin', 'Taranis', 'Some Duder 2'),
      TestHelpers.killData('Kellyl', 'Merlin', 'Taranis', 'Some Duder 3'),
      TestHelpers.killData('Sp4m', 'Enyo', 'Taranis', 'Some Duder 3')
    ]

    const killData: ICharacterKillData[] = [
      {
        id: 1,
        name: 'Kellyl',
        kills: kills,
        losses: []
      }
    ]

    const viewModel = await provider.viewModel(killData)
    chai.assert.equal(viewModel.characters.length, 1)
    chai.assert.isNotNull(viewModel.characters[0])

    chai.assert.equal(viewModel.characters[0].flownShips.length, 2)
    chai.assert.equal(viewModel.characters[0].flownShips[0].name, 'Merlin')
    chai.assert.equal(viewModel.characters[0].flownShips[0].count, 2)
    chai.assert.equal(viewModel.characters[0].flownShips[0].killsWhileFlying, 2)
    chai.assert.equal(viewModel.characters[0].flownShips[0].losses, 0)
    chai.assert.equal(viewModel.characters[0].flownShips[1].name, 'Enyo')
    chai.assert.equal(viewModel.characters[0].flownShips[1].count, 1)
    chai.assert.equal(viewModel.characters[0].flownShips[1].killsWhileFlying, 1)
    chai.assert.equal(viewModel.characters[0].flownShips[1].losses, 0)

  }),
  it('calculates recent flown ships from losses', async () => {

    const losses = [
      TestHelpers.killData('Some Dude', 'Taranis', 'Rapier', 'Kellyl'),
      TestHelpers.killData('Another Dude', 'Merlin', 'Taranis', 'Kellyl'),
      TestHelpers.killData('Some Dude', 'Ishkur', 'Pilgrim', 'Kellyl'),
      TestHelpers.killData('Station Camper Pro', 'Merlin', 'Taranis', 'Kellyl')
    ]

    const killData: ICharacterKillData[] = [
      {
        id: 1,
        name: 'Kellyl',
        kills: [],
        losses: losses
      }
    ]

    const viewModel = await provider.viewModel(killData)
    chai.assert.equal(viewModel.characters.length, 1)
    chai.assert.isNotNull(viewModel.characters[0])

    chai.assert.equal(viewModel.characters[0].flownShips.length, 3)
    chai.assert.equal(viewModel.characters[0].flownShips[0].name, 'Taranis')
    chai.assert.equal(viewModel.characters[0].flownShips[0].count, 2)
    chai.assert.equal(viewModel.characters[0].flownShips[0].killsWhileFlying, 0)
    chai.assert.equal(viewModel.characters[0].flownShips[0].losses, 2)
    chai.assert.equal(viewModel.characters[0].flownShips[1].name, 'Pilgrim')
    chai.assert.equal(viewModel.characters[0].flownShips[1].count, 1)
    chai.assert.equal(viewModel.characters[0].flownShips[1].killsWhileFlying, 0)
    chai.assert.equal(viewModel.characters[0].flownShips[1].losses, 1)
    chai.assert.equal(viewModel.characters[0].flownShips[2].name, 'Rapier')
    chai.assert.equal(viewModel.characters[0].flownShips[2].count, 1)
    chai.assert.equal(viewModel.characters[0].flownShips[2].killsWhileFlying, 0)
    chai.assert.equal(viewModel.characters[0].flownShips[2].losses, 1)

  }),
  it('Adds cyno ppoint of interest if losses contain a cyno', async () => {
    const losses = [
      TestHelpers.killData('Some Dude', 'Taranis', 'Rapier', 'Kellyl')
    ]

    const killData: ICharacterKillData[] = [
      {
        id: 1,
        name: 'Kellyl',
        kills: [],
        losses: losses
      }
    ]
    const viewModel = await provider.viewModel(killData)
    chai.assert.equal(viewModel.characters.length, 1)
    chai.assert.isNotNull(viewModel.characters[0])
    const character = viewModel.characters[0]

    chai.assert.equal(character.flownShips.length, 1)
    chai.assert.equal(character.flownShips[0].name, 'Taranis')

  }),
  it('calculates recent flwon ships from kills and losses', async () => {

    const kills = [
      TestHelpers.killData('Kellyl', 'Taranis', 'Rapier', 'fasdg'),
      TestHelpers.killData('Sp4m', 'Merlin', 'Taranis', 'acvdsv'),
      TestHelpers.killData('Kellyl', 'Rapier', 'Pilgrim', 'sadg4g'),
      TestHelpers.killData('Kellyl', 'Merlin', 'Taranis', 'sdvhsdh')
    ]

    const losses = [
      TestHelpers.killData('Some Dude', 'Taranis', 'Rapier', 'Kellyl'),
      TestHelpers.killData('Another Dude', 'Merlin', 'Taranis', 'Kellyl'),
      TestHelpers.killData('Some Dude', 'Ishkur', 'Pilgrim', 'Kellyl'),
      TestHelpers.killData('Station Camper Pro', 'Merlin', 'Taranis', 'Kellyl')
    ]

    const killData: ICharacterKillData[] = [
      {
        id: 1,
        name: 'Kellyl',
        kills: kills,
        losses: losses
      }
    ]

    const viewModel = await provider.viewModel(killData)
    chai.assert.equal(viewModel.characters.length, 1)
    chai.assert.isNotNull(viewModel.characters[0])

    chai.assert.equal(viewModel.characters[0].flownShips.length, 4)
    chai.assert.equal(viewModel.characters[0].flownShips[0].name, 'Taranis')
    chai.assert.equal(viewModel.characters[0].flownShips[0].count, 3)
    chai.assert.equal(viewModel.characters[0].flownShips[0].killsWhileFlying, 1)
    chai.assert.equal(viewModel.characters[0].flownShips[0].losses, 2)
    chai.assert.equal(viewModel.characters[0].flownShips[1].name, 'Rapier')
    chai.assert.equal(viewModel.characters[0].flownShips[1].count, 2)
    chai.assert.equal(viewModel.characters[0].flownShips[1].killsWhileFlying, 1)
    chai.assert.equal(viewModel.characters[0].flownShips[1].losses, 1)
    chai.assert.equal(viewModel.characters[0].flownShips[2].name, 'Merlin')
    chai.assert.equal(viewModel.characters[0].flownShips[2].count, 1)
    chai.assert.equal(viewModel.characters[0].flownShips[2].killsWhileFlying, 1)
    chai.assert.equal(viewModel.characters[0].flownShips[2].losses, 0)
    chai.assert.equal(viewModel.characters[0].flownShips[3].name, 'Pilgrim')
    chai.assert.equal(viewModel.characters[0].flownShips[3].count, 1)
    chai.assert.equal(viewModel.characters[0].flownShips[3].killsWhileFlying, 0)
    chai.assert.equal(viewModel.characters[0].flownShips[3].losses, 1)

  })
})
