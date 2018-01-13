import { EVEKSpaceData } from './EVEKSpaceData'

export default class EVEKSpaceDatabase implements IEVEKSpaceDatabase {

  systems: any

  constructor() {
    this.systems = JSON.parse(EVEKSpaceData.systems)
  }

  nameForSolarSystemID(solarSystemID: number): string {

    const system = this.systems.tables.mapKSolarSystems.d[solarSystemID]
    if (system === undefined) {
      return 'unknown system'
    }

    return system[2]
  }
}
