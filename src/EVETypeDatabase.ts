import { EVETypeData } from './EVETypeData'

export default class EVETypeDatabase implements IEVETypeDatabase {

  data: any

  constructor() {
    this.data = JSON.parse(EVETypeData.types)
  }

  nameForTypeID(typeID: number): string {
    const type = this.data.tables.invTypes.d[typeID]
    if (type === undefined) {
      return 'unknown type'
    }
    return type[1]
  }
}
