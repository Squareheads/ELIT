export namespace TestHelpers {
  export function killData(attackerName: string, attackerShip: string, victimShip: string, victimName: string): ICharacterKillmail {
    return {
      solarSystem: 'system',
      attackers: [
        {
          allianceId: 0,
          characterName: attackerName,
          corporationId: 0,
          factionId: 0,
          finalBlow: true,
          securityStatus: 0.1,
          shipType: attackerShip,
          weaponType: 'Light Neutron Blaster II',
          shipId: 0
        }
      ],
      killmailID: 0,
      killmailTime: new Date(2017, 1, 1),
      victim: {
        allianceID: 0,
        characterName: victimName,
        coroporationID: 0,
        damageTaken: 0,
        items: [],
        shipType: victimShip,
        shipId: 0
      }
    }
  }
}
