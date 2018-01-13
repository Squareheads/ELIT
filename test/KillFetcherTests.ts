import * as mocks from '../mocks/mocks'
import 'mocha'
import * as chai from 'chai'
import KillFetcher from '../src/KillFetcher'
import { killmailMocks } from './killmailMocks'
import EVEKSpaceDatabase from '../src/EVEKSpaceDatabase'
import EVETypeDatabase from '../src/EVETypeDatabase'

describe('KillFetcher', () => {
  let typeDB: EVETypeDatabase
  let connectionManager: mocks.MockConnectionManager
  let killmailParser: mocks.MockKillmailParser
  let kspaceDB: EVEKSpaceDatabase
  let characterIDResolver: mocks.MockCharacterIDResolver
  let killFetcher: KillFetcher
  const characters: IResolvedCharacter[] = [
    { name: 'Kellyl', id: 580797163 },
    { name: 'Sp4m', id: 780702065 },
    { name: 'J4ke', id: 163660200 }
  ]
  beforeEach(() => {
    typeDB = new EVETypeDatabase()
    connectionManager = new mocks.MockConnectionManager()
    killmailParser = new mocks.MockKillmailParser()
    kspaceDB = new EVEKSpaceDatabase()
    characterIDResolver = new mocks.MockCharacterIDResolver()
    killFetcher = new KillFetcher(connectionManager, killmailParser, kspaceDB, typeDB, characterIDResolver)
  })
  afterEach(() => {
    //
  }),
  it('gets kill for a single character from a url', async () => {

    let data = mocks.Data.CharacterIDResolver.singleCharacter
    connectionManager.bodyToReturn = data
    try {
      await killFetcher.getKills([{ name: 'Kellyl', id: 1 }])
      .then((_kills: ICharacterKillData[]) => {
        // noop
      })
      .catch((_error) => {
        // noop
      })

    } catch (e) {
      chai.assert.fail()
    }

    const captured = connectionManager.capturedURL
    const expected = 'https://zkillboard.com/api/characterID/1/limit/50/'
    chai.assert.equal(captured, expected)
  }),
  it('gets kill for multiple characters from a url', async () => {

    let data = killmailMocks.simpleResponse
    connectionManager.bodyToReturn = data
    try {
      await killFetcher.getKills(characters)
      .then((_kills: ICharacterKillData[]) => {
        // noop
      })
      .catch((_error) => {
        // noop
      })

    } catch (e) {
      chai.assert.fail()
    }

    const captured = connectionManager.capturedURLs
    chai.assert.equal(captured[0], 'https://zkillboard.com/api/characterID/580797163/limit/50/')
    chai.assert.equal(captured[1], 'https://zkillboard.com/api/characterID/780702065/limit/50/')
    chai.assert.equal(captured[2], 'https://zkillboard.com/api/characterID/163660200/limit/50/')

    chai.assert.equal(captured.length, 3)
  }),
  it('sends data to the parser', async () => {
    let data = killmailMocks.simpleResponse
    connectionManager.bodyToReturn = data
    try {
      await killFetcher.getKills(characters)
      .then((_kills: ICharacterKillData[]) => {
        // noop
      })
      .catch((_error) => {
        // noop
      })

    } catch (e) {
      chai.assert.fail()
    }

    const captured = killmailParser.capturedData
    const expected = killmailMocks.simpleResponse
    chai.assert.equal(captured, expected)
  }),
  it('Returns organised kill data from parser from single kill response', async () => {

    characterIDResolver.charactersToReturn = []
    let data = killmailMocks.simpleResponse
    connectionManager.bodyToReturn = data
    killmailParser.killmailsToReturn = killmailMocks.parsedSimpleResponse
    let kills: ICharacterKillData[] = []
    try {
      kills = await killFetcher.getKills([{ id: 2112957068, name: 'a name' }])
    } catch (e) {
      // noop
    }

    chai.assert.equal(kills.length, 1, 'Should have 1 kill')
    chai.assert.equal(kills[0].id, 2112957068)
    chai.assert.equal(kills[0].name, 'a name')
    chai.assert.equal(kills[0].losses.length, 1)
    chai.assert.equal(kills[0].losses[0].killmailID, 66438342)
    chai.assert.equal(kills[0].losses[0].killmailTime.getTime(), 1512674229000)
    chai.assert.equal(kills[0].losses[0].solarSystem, 'Abune')
    chai.assert.equal(kills[0].losses[0].victim.shipType, 'Caldari Navy Hookbill')
    chai.assert.equal(kills[0].losses[0].victim.items[0].itemType, 'Caldari Navy Scourge Rocket')

  }),
  it('Returns organised kill data from parser from one kill one loss response', async () => {

    const mockedChars = [
      { id: 580797163, name: '1' },
      { id: 93147441, name: 'bob' },
      { id: 95413509, name: '3' },
      { id: 91101290, name: '4' },
      { id: 780702065, name: '5' },
      { id: 163660200, name: '6' }
    ]
    characterIDResolver.charactersToReturn = mockedChars

    let data = killmailMocks.simpleResponse
    connectionManager.bodyToReturn = data
    killmailParser.killmailsToReturn = killmailMocks.kellylOneKillOneLoss
    let kills: ICharacterKillData[] = []
    try {
      kills = await killFetcher.getKills([{ id: 580797163, name: 'Kellyl' }])
    } catch (e) {
      // noop
    }

    chai.assert.equal(kills.length, 1, 'Should have 1 killmails')
    chai.assert.equal(kills[0].id, 580797163)
    chai.assert.equal(kills[0].name, 'Kellyl')
    chai.assert.equal(kills[0].losses.length, 1, 'should have 1 loss')
    chai.assert.equal(kills[0].losses[0].killmailID, 66587576)
    chai.assert.equal(kills[0].losses[0].killmailTime.getTime(), 1513208731000)
    chai.assert.equal(kills[0].losses[0].solarSystem, 'Aldranette')
    chai.assert.equal(kills[0].losses[0].victim.shipType, 'Merlin')
    chai.assert.equal(kills[0].losses[0].victim.items[0].itemType, '150mm Railgun II')

    chai.assert.equal(kills[0].kills.length, 1, 'should have 1 kill')
    chai.assert.equal(kills[0].kills[0].victim.characterName, 'bob')
    chai.assert.equal(kills[0].kills[0].victim.shipType, 'Daredevil')
    chai.assert.equal(kills[0].kills[0].attackers.length, 4, 'should have 4 attackers')
    chai.assert.equal(kills[0].kills[0].attackers[0].shipType, 'Merlin')
    chai.assert.equal(kills[0].kills[0].attackers[0].weaponType, 'Merlin')
    chai.assert.equal(kills[0].kills[0].attackers[1].shipType, 'Incursus')
    chai.assert.equal(kills[0].kills[0].attackers[1].weaponType, 'Light Neutron Blaster II')
    chai.assert.equal(kills[0].kills[0].attackers[2].shipType, 'Tristan')
    chai.assert.equal(kills[0].kills[0].attackers[2].weaponType, 'Warrior I')
    chai.assert.equal(kills[0].kills[0].attackers[3].shipType, 'Federation Frigate')
    chai.assert.equal(kills[0].kills[0].attackers[3].weaponType, 'none')
  })
})
