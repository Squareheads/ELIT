export default class KillFetcher implements IKillFetcher {

  connectionManager: IConnectionManager
  killParser: IKillmailParser
  kspaceDB: IEVEKSpaceDatabase
  typeDB: IEVETypeDatabase
  characterIDResolver: ICharacterIDResolver

  constructor(connectionManager: IConnectionManager,
    killParser: IKillmailParser,
    kspaceDB: IEVEKSpaceDatabase,
    typeDB: IEVETypeDatabase,
    characterIDResolver: ICharacterIDResolver) {
    this.characterIDResolver = characterIDResolver
    this.connectionManager = connectionManager
    this.killParser = killParser
    this.kspaceDB = kspaceDB
    this.typeDB = typeDB
  }

  async getKills(characters: IResolvedCharacter[]): Promise<ICharacterKillData[]> {
    return new Promise<ICharacterKillData[]>(async (resolve, reject) => {
      try {

        const promises = characters.map((character): Promise<ICharacterKillData> => {
          return this.getSingleCharacterKills(character)
        })

        const characterKillData = await Promise.all(promises)

        resolve(characterKillData)
      } catch (e) {
        reject('getKills failed: ' + e)
      }
    })
  }

  private async getSingleCharacterKills(character: IResolvedCharacter): Promise<ICharacterKillData> {

    return new Promise<ICharacterKillData>(async (resolve, reject) => {
      try {
        const URL = 'https://zkillboard.com/api/characterID/' + character.id + '/limit/50/'
        const data = await this.connectionManager.get(URL)
        const parsedKills = this.killParser.parse(data)

        const characterKillData = await this.killDataForCharacter(character, parsedKills)
        resolve(characterKillData)

      } catch (e) {
        reject('getSingleCharacterKills failed: ' + e)
      }
    })
  }

  private async killDataForCharacter(character: IResolvedCharacter, killData: IZKillboardKillmail[]): Promise<ICharacterKillData> {
    return new Promise<ICharacterKillData>(async (resolve, reject) => {
      try {
        let rawLosses = (killData || []).filter((kill: IZKillboardKillmail): boolean => {
          return kill.victim.character_id === character.id
        })
        let rawKills = (killData || []).filter((kill: IZKillboardKillmail): boolean => {
          for (const attacker in kill.attackers) {
            if (kill.attackers.hasOwnProperty(attacker)) {
              const element = kill.attackers[attacker]
              if (element.character_id === character.id) {
                return true
              }
            }
          }
          return false
        })

        let rawIdsToResolve: number[] = []

        rawLosses.forEach((killmail: IZKillboardKillmail) => {
          if (killmail.victim.character_id) {
            rawIdsToResolve.push(killmail.victim.character_id)
          }
          killmail.attackers.forEach((attacker: IZKillboardAttacker) => {
            if (attacker.character_id) {
              rawIdsToResolve.push(attacker.character_id)
            }
          })
        })

        rawKills.forEach((killmail: IZKillboardKillmail) => {
          if (killmail.victim.character_id) {
            rawIdsToResolve.push(killmail.victim.character_id)
          }
          killmail.attackers.forEach((attacker: IZKillboardAttacker) => {
            if (attacker.character_id) {
              rawIdsToResolve.push(attacker.character_id)
            }
          })
        })

        const idsToResolve = Array.from(new Set(rawIdsToResolve))

        const resolvedCharacters = await this.characterIDResolver.resolveIDs(idsToResolve)
        resolvedCharacters.push(character)
        let processedLosses = rawLosses.map((rawKillmail: IZKillboardKillmail): ICharacterKillmail => {
          return {
            killmailID: rawKillmail.killmail_id,
            killmailTime: new Date(rawKillmail.killmail_time),
            solarSystem: this.kspaceDB.nameForSolarSystemID(rawKillmail.solar_system_id),
            victim: this.enrichedVictim(rawKillmail.victim, resolvedCharacters),
            attackers: []
          }
        })
        let processedKills = rawKills.map((rawKillmail: IZKillboardKillmail): ICharacterKillmail => {
          const attackers = rawKillmail.attackers.map((attacker: IZKillboardAttacker): ICharacterKillmailAttacker => {
            return this.enrichedAttacker(attacker, resolvedCharacters)
          })
          return {
            killmailID: rawKillmail.killmail_id,
            killmailTime: new Date(rawKillmail.killmail_time),
            solarSystem: this.kspaceDB.nameForSolarSystemID(rawKillmail.solar_system_id),
            victim: this.enrichedVictim(rawKillmail.victim, resolvedCharacters),
            attackers: attackers
          }
        })

        resolve({ id: character.id, name: character.name, losses: processedLosses, kills: processedKills })
      } catch (reason) {
        reject(reason)
      }
    })
  }

  private enrichedAttacker(attacker: IZKillboardAttacker, resolvedCharacters: IResolvedCharacter[]): ICharacterKillmailAttacker {
    let weaponType = 'none'
    if (attacker.weapon_type_id) {
      weaponType = this.typeDB.nameForTypeID(attacker.weapon_type_id)
    }
    const potentialCharacterNames = resolvedCharacters.filter((character): boolean => {
      return character.id === (attacker.character_id || 0)
    })

    let attackerName = 'unknown'
    if (potentialCharacterNames && potentialCharacterNames[0] && potentialCharacterNames[0].name) {
      attackerName = potentialCharacterNames[0].name
    }

    return {
      characterName: attackerName,
      allianceId: attacker.alliance_id,
      corporationId: attacker.corporation_id,
      factionId: attacker.faction_id,
      finalBlow: attacker.final_blow,
      securityStatus: attacker.security_status,
      shipType: this.typeDB.nameForTypeID(attacker.ship_type_id),
      shipId: attacker.ship_type_id,
      weaponType: weaponType
    }
  }
  private enrichedVictim(victim: IZKillboardVictim, resolvedCharacters: IResolvedCharacter[]): ICharacterKillmailVictim {
    const items = victim.items.map((item: IZKillboardItem): ICharacterKillmailItem => {
      return this.enrichedItem(item)
    })

    const potentialCharacterNames = resolvedCharacters.filter((character): boolean => {
      return character.id === victim.character_id
    })
    let victimName = 'unknown'
    if (potentialCharacterNames && potentialCharacterNames[0] && potentialCharacterNames[0].name) {
      victimName = potentialCharacterNames[0].name
    }

    return {
      allianceID: victim.alliance_id || -1,
      characterName: victimName,
      coroporationID: victim.corporation_id || -1,
      damageTaken: victim.damage_taken,
      shipType: this.typeDB.nameForTypeID(victim.ship_type_id),
      shipId: victim.ship_type_id,
      items: items
    }
  }

  private enrichedItem(item: IZKillboardItem): ICharacterKillmailItem {
    const enriched = {
      itemType: this.typeDB.nameForTypeID(item.item_type_id),
      itemTypeID: item.item_type_id
    }

    return enriched
  }
}
