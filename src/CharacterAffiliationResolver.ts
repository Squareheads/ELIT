import * as Collections from 'typescript-collections'
import { CharacterApi, PostCharactersAffiliation200Ok, UniverseApi } from 'eve-online-esi'
import { ClientResponse } from 'http'

export default class CharacterAffiliationResolver implements ICharacterAffiliationResolver {
  characterApi: CharacterApi
  universeApi: UniverseApi

  constructor() {
    this.characterApi = new CharacterApi()
    this.universeApi = new UniverseApi()
  }

  async getAffiliations(characterIDs: number[]): Promise<Collections.Dictionary<number,ICharacterAffiliationInfo>> {

    return new Promise<Collections.Dictionary<number,ICharacterAffiliationInfo>>(async (resolve, reject) => {
      try {
        const uniqueCharacterIDs = Array.from(new Set(characterIDs))

        const affiliations: { response: ClientResponse; body: Array<PostCharactersAffiliation200Ok>; } = await this.characterApi.postCharactersAffiliation(uniqueCharacterIDs)
        let characterIdAffiliationIds: Collections.Dictionary<number, {corporationId: number, allianceId: number}> = new Collections.Dictionary()

        affiliations.body.forEach((affiliation) => {
          const thing = JSON.parse(JSON.stringify(affiliation))
          const charId = thing['character_id']
          const corpId = thing['corporation_id'] || -1
          const allianceId = thing['alliance_id'] || -1

          const value = { corporationId: corpId, allianceId: allianceId }
          characterIdAffiliationIds.setValue(charId, value)
        })

        let idsToLookUp: Set<number> = new Set<number>()
        characterIdAffiliationIds.keys().forEach((key) => {
          const corpId = characterIdAffiliationIds.getValue(key).corporationId
          const allianceId = characterIdAffiliationIds.getValue(key).allianceId
          if (corpId !== -1) {
            idsToLookUp.add(corpId)
          }

          if (allianceId !== -1) {
            idsToLookUp.add(allianceId)
          }
        })

        const postUniverseNamesResult = await this.universeApi.postUniverseNames(Array.from(idsToLookUp))

        let corporations = new Collections.Dictionary<number, string>()
        let alliances = new Collections.Dictionary<number, string>()
        postUniverseNamesResult.body.forEach((entity: any) => {
          const parsedEntity = JSON.parse(JSON.stringify(entity))
          const id = parsedEntity['id']
          const name = parsedEntity['name']
          const category = parsedEntity['category']

          if (category === 'corporation') {
            corporations.setValue(id, name)
          }

          if (category === 'alliance') {
            alliances.setValue(id, name)
          }

        })

        let dict: Collections.Dictionary < number,ICharacterAffiliationInfo > = new Collections.Dictionary()

        uniqueCharacterIDs.forEach((characterId) => {
          const corpId = characterIdAffiliationIds.getValue(characterId).corporationId
          const allianceId = characterIdAffiliationIds.getValue(characterId).allianceId
          const value = { corporationName: corporations.getValue(corpId) || '', allianceName: alliances.getValue(allianceId) || '' }
          dict.setValue(characterId, value)
        })
        resolve(dict)
      } catch (reason) {
        reject(reason)
      }
    })
  }
}
