
import 'mocha'
import * as chai from 'chai'
import { CharacterLookup } from '../src/CharacterLookup'
import * as mocks from '../mocks/mocks'

describe('CharacterLookup', () => {
  let characterIDResolver: mocks.MockCharacterIDResolver
  let characterLookup: CharacterLookup
  let killFetcher: mocks.MockKillFetcher

  beforeEach(() => {
    characterIDResolver = new mocks.MockCharacterIDResolver()
    killFetcher = new mocks.MockKillFetcher()
    characterLookup = new CharacterLookup(characterIDResolver, killFetcher)
    characterIDResolver.capturedNames = []
    characterIDResolver.charactersToReturn = [
      { name: 'test', id: 7 }
    ]
    killFetcher.killsToReturn = [
      { id: 1, losses: [], kills: [], name: 'name' }
    ]
  }),

  it('Should get ids for single characters', () => {
    let capturedCharacters: ICharacterKillData[] = []
    let capturedError: any

    characterLookup.lookupCharacters('foo')
    .then((values: ICharacterKillData[]) => {
      capturedCharacters = values
      chai.assert.isArray(capturedCharacters)
      chai.assert.isUndefined(capturedError)
      chai.assert.equal(characterIDResolver.capturedNames.length, 1)
      chai.assert.equal(characterIDResolver.capturedNames[0], 'foo')
    })
    .catch((reason) => {
      capturedError = reason
    })

  }),
  it('Should get ids for multiple characters', () => {
    let capturedCharacters: ICharacterKillData[] = []
    let capturedError: any

    characterLookup.lookupCharacters('foo,baa,more,names')
    .then((values: ICharacterKillData[]) => {
      capturedCharacters = values
      chai.assert.isArray(capturedCharacters)
      chai.assert.isUndefined(capturedError)
      chai.assert.equal(characterIDResolver.capturedNames.length, 4)
      chai.assert.equal(characterIDResolver.capturedNames[0], 'foo')
      chai.assert.equal(characterIDResolver.capturedNames[1], 'baa')
      chai.assert.equal(characterIDResolver.capturedNames[2], 'more')
      chai.assert.equal(characterIDResolver.capturedNames[3], 'names')
    })
    .catch((reason) => {
      capturedError = reason
    })
  }),
  it('fetches kills with character ids', () => {

    return characterLookup.lookupCharacters('foo,baa,more,names')
    .then((_values: ICharacterKillData[]) => {
      chai.assert.equal(killFetcher.capturedCharacters.length, 1)
      chai.assert.equal(killFetcher.capturedCharacters[0].name, 'test')
      chai.assert.equal(killFetcher.capturedCharacters[0].id, 7)
    })
    .catch((_reason) => {
      /* noop */
      chai.assert.fail()
    })
  }),
  it('returns kills actual kill data', async () => {

    let info: ICharacterKillData[] = []
    try {
      info = await characterLookup.lookupCharacters('name')
    } catch (e) {
      chai.assert.fail(e)
    }
    chai.assert.equal(info.length, 1)
    chai.assert.equal(info[0].id, 1)
    chai.assert.equal(info[0].name, 'name')
  })
})
