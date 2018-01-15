import 'mocha'
import * as chai from 'chai'
import { CharacterIDResolver } from '../src/CharacterIDResolver'

import * as mocks from '../mocks/mocks'
import { PostUniverseNames200Ok } from 'eve-online-esi'

describe('CharacterIDResolver', () => {
  let resolver: CharacterIDResolver
  let characterIDNameStore: mocks.MockCharacterNameIDStore
  let universeApi: mocks.MockUniverseApi
  beforeEach(() => {
    universeApi = new mocks.MockUniverseApi()
    characterIDNameStore = new mocks.MockCharacterNameIDStore()
    resolver = new CharacterIDResolver(characterIDNameStore, universeApi)
  }),

  it('Should make an API Request', async () => {
    try {
      await resolver.resolveNames(['kellyl'])
      .then((_resolvedChars: any[]) => { /*noop*/ })
      .catch((_reason) => { /*noop*/ })

    } catch (e) {
      chai.assert.fail()
    }

    chai.assert.deepEqual(universeApi.capturedPostUniverseIdsIds, ['kellyl'])
  }),

  it('Should handle single character responses', () => {
    universeApi.postUniverseIdsBody = {
      agents: [],
      alliances: [],
      characters: [
        {
          id: 580797163,
          name: 'Kellyl'
        }
      ],
      constellations: [],
      corporations: [],
      factions: [],
      inventoryTypes: [],
      regions: [],
      stations: [],
      systems: []
    }
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
    universeApi.postUniverseIdsBody = {
      agents: [],
      alliances: [],
      characters: [
        {
          id: 580797163,
          name: 'Kellyl'
        },
        {
          id: 780702065,
          name: 'Sp4m'
        }
      ],
      constellations: [],
      corporations: [],
      factions: [],
      inventoryTypes: [],
      regions: [],
      stations: [],
      systems: []
    }

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
  it('Should store fetched IDs in the store', async () => {
    universeApi.postUniverseIdsBody = {
      agents: [],
      alliances: [],
      characters: [
        {
          id: 580797163,
          name: 'Kellyl'
        },
        {
          id: 780702065,
          name: 'Sp4m'
        }
      ],
      constellations: [],
      corporations: [],
      factions: [],
      inventoryTypes: [],
      regions: [],
      stations: [],
      systems: []
    }

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
    universeApi.postUniverseIdsBody = {
      agents: [],
      alliances: [],
      characters: [
        {
          id: 580797163,
          name: 'Kellyl'
        },
        {
          id: 780702065,
          name: 'Sp4m'
        }
      ],
      constellations: [],
      corporations: [],
      factions: [],
      inventoryTypes: [],
      regions: [],
      stations: [],
      systems: []
    }

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
    universeApi.postUniverseIdsBody = {
      agents: [],
      alliances: [],
      characters: [
        {
          id: 580797163,
          name: 'Kellyl'
        },
        {
          id: 780702065,
          name: 'Sp4m'
        }
      ],
      constellations: [],
      corporations: [],
      factions: [],
      inventoryTypes: [],
      regions: [],
      stations: [],
      systems: []
    }
    try {
      resolved = await resolver.resolveNames(['kellyl', 'sp4m'])
    } catch (e) {
      chai.assert.fail(e)
    }
    chai.assert.deepEqual(resolved, [{ id: 6, name: 'kellyl' }, { id: 580797163, name: 'Kellyl' }, { id:  780702065, name: 'Sp4m' } ])

  }),
  it('Should fetch Names for ID', async () => {
    universeApi.postUniverseNamesBody = [
      {
        category: PostUniverseNames200Ok.CategoryEnum.Character,
        id: 0,
        name: 'ss'
      }
    ]
    try {
      await resolver.resolveIDs([1])
      .then((_resolvedChars: any[]) => { /*noop*/ })
      .catch((_reason) => { /*noop*/ })

    } catch (e) {
      chai.assert.fail()
    }

    chai.assert.deepEqual(universeApi.capturedPostUniverseNamesIds, [1])
  }),
  it('Should fetch Names for IDs', async () => {

    universeApi.postUniverseNamesBody = [
      {
        category: PostUniverseNames200Ok.CategoryEnum.Character,
        id: 0,
        name: 'ss'
      }
    ]

    try {
      await resolver.resolveIDs([1,2,3])
      .then((_resolvedChars: any[]) => { /*noop*/ })
      .catch((_reason) => { /*noop*/ })

    } catch (e) {
      chai.assert.fail()
    }

    chai.assert.deepEqual(universeApi.capturedPostUniverseNamesIds, [1, 2, 3])
  })
})
