import 'mocha'
import * as chai from 'chai'
import { CharacterIDResolver } from '../src/CharacterIDResolver'

import * as mocks from '../mocks/mocks'

describe('CharacterIDResolver', () => {
  let connectionManager: mocks.MockConnectionManager
  let resolver: CharacterIDResolver
  let tokenStore: mocks.MockAPITokenStore
  let characterIDNameStore: mocks.MockCharacterNameIDStore

  beforeEach(() => {
    characterIDNameStore = new mocks.MockCharacterNameIDStore()
    tokenStore = new mocks.MockAPITokenStore()
    tokenStore.tokenToReturn = { keyID: 'key', verificationCode: 'code' }
    connectionManager = new mocks.MockConnectionManager()
    resolver = new CharacterIDResolver(tokenStore, connectionManager, characterIDNameStore)
  }),

  it('Should make an API Request to the correct URL', async () => {
    let data = mocks.Data.CharacterIDResolver.singleCharacter
    connectionManager.bodyToReturn = data
    try {
      await resolver.resolveNames(['kellyl'])
      .then((_resolvedChars: any[]) => { /*noop*/ })
      .catch((_reason) => { /*noop*/ })

    } catch (e) {
      chai.assert.fail()
    }

    const captured = connectionManager.capturedURL
    const expected = 'https://api.eveonline.com/eve/CharacterID.xml.aspx?keyID=key&vCode=code&names=kellyl'
    chai.assert.equal(captured, expected)

  }),

  it('Should handle single character responses', () => {
    let data = mocks.Data.CharacterIDResolver.singleCharacter
    connectionManager.bodyToReturn = data
    return resolver.resolveNames(['kellyl'])
      .then((resolvedChars: IResolvedCharacter[]) => {
        chai.assert.equal(resolvedChars.length, 1)
        chai.assert.equal(resolvedChars[0].id, 580797163)
        chai.assert.equal(resolvedChars[0].name, 'Kellyl')

      })
      .catch((_reason) => {
        chai.assert.fail()
      })
  }),
  it('Should handle double character responses', () => {
    let data = mocks.Data.CharacterIDResolver.twoCharacters
    connectionManager.bodyToReturn = data
    return resolver.resolveNames(['kellyl'])
      .then((resolvedChars: IResolvedCharacter[]) => {
        chai.assert.equal(resolvedChars.length, 2)
        chai.assert.equal(resolvedChars[0].id, 580797163)
        chai.assert.equal(resolvedChars[0].name, 'Kellyl')
        chai.assert.equal(resolvedChars[1].id, 780702065)
        chai.assert.equal(resolvedChars[1].name, 'Sp4m')

      })
      .catch((_reason) => {
        chai.assert.fail()
      })
  }),
  it('Should handle responses with good and bad characters', () => {
    let data = mocks.Data.CharacterIDResolver.oneGoodOneBad
    connectionManager.bodyToReturn = data
    return resolver.resolveNames(['kellyl'])
      .then((resolvedChars: IResolvedCharacter[]) => {
        chai.assert.equal(resolvedChars.length, 1)
        chai.assert.equal(resolvedChars[0].id, 580797163)
        chai.assert.equal(resolvedChars[0].name, 'Kellyl')
      })
      .catch((_reason) => {
        chai.assert.fail()
      })
  }),
  it('Should handle responses with single bad character', () => {
    let data = mocks.Data.CharacterIDResolver.oneBadCharacter
    connectionManager.bodyToReturn = data
    return resolver.resolveNames(['kellyl'])
      .then((resolvedChars: IResolvedCharacter[]) => {
        chai.assert.equal(resolvedChars.length, 0)
      })
      .catch((_reason) => {
        chai.assert.fail()
      })
  }),
  it('Should store fetched IDs in the store', async () => {
    let data = mocks.Data.CharacterIDResolver.twoCharacters
    connectionManager.bodyToReturn = data
    try {
      await resolver.resolveNames(['kellyl'])
    } catch (e) {
      chai.assert.fail(e)
    }

    chai.assert.equal(characterIDNameStore.storedCharacters.length, 2)
    chai.assert.equal(characterIDNameStore.storedCharacters[0].id, 580797163)
    chai.assert.equal(characterIDNameStore.storedCharacters[0].name, 'Kellyl')
    chai.assert.equal(characterIDNameStore.storedCharacters[1].id, 780702065)
    chai.assert.equal(characterIDNameStore.storedCharacters[1].name, 'Sp4m')
  }),
  it('Should get character IDs from store', async () => {
    let data = mocks.Data.CharacterIDResolver.twoCharacters
    connectionManager.bodyToReturn = data
    try {
      await resolver.resolveNames(['kellyl'])
    } catch (e) {
      chai.assert.fail(e)
    }

    chai.assert.deepEqual(characterIDNameStore.capturedGetNames, ['kellyl'])
  }),
  it('Doesnt fetch IDs for cached characters', async () => {
    let resolved: IResolvedCharacter[] = []
    characterIDNameStore.charactersToReturn = [{ id: 6, name: 'kellyl' }]
    let data = mocks.Data.CharacterIDResolver.twoCharacters
    connectionManager.bodyToReturn = data
    try {
      resolved = await resolver.resolveNames(['kellyl', 'sp4m'])
    } catch (e) {
      chai.assert.fail(e)
    }
    const captured = connectionManager.capturedURL
    const expected = 'https://api.eveonline.com/eve/CharacterID.xml.aspx?keyID=key&vCode=code&names=sp4m'
    chai.assert.equal(captured, expected)
    chai.assert.deepEqual(resolved, [{ id: 6, name: 'kellyl' }, { id: 580797163, name: 'Kellyl' }, { id:  780702065, name: 'Sp4m' } ])
  }),
  it('Should fetch Names for ID', async () => {
    let data = mocks.Data.CharacterIDResolver.singleCharacter
    connectionManager.bodyToReturn = data
    try {
      await resolver.resolveIDs([1])
      .then((_resolvedChars: any[]) => { /*noop*/ })
      .catch((_reason) => { /*noop*/ })

    } catch (e) {
      chai.assert.fail()
    }

    const captured = connectionManager.capturedURL
    const expected = 'https://api.eveonline.com/eve/CharacterName.xml.aspx?keyID=key&vCode=code&ids=1'
    chai.assert.equal(captured, expected)
  }),
  it('Should fetch Names for IDs', async () => {
    let data = mocks.Data.CharacterIDResolver.singleCharacter
    connectionManager.bodyToReturn = data
    try {
      await resolver.resolveIDs([1,2,3])
      .then((_resolvedChars: any[]) => { /*noop*/ })
      .catch((_reason) => { /*noop*/ })

    } catch (e) {
      chai.assert.fail()
    }

    const captured = connectionManager.capturedURL
    const expected = 'https://api.eveonline.com/eve/CharacterName.xml.aspx?keyID=key&vCode=code&ids=1,2,3'
    chai.assert.equal(captured, expected)
  })
})
