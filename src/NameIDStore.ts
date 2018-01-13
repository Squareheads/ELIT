import NameIDDatabase from './NameIDDatabase'

export default class NameIDStore implements INameIDStore {

  database: NameIDDatabase

  constructor(database: NameIDDatabase) {
    this.database = database
  }

  store(values: INameIDStorable[]) {
    this.database.transaction('rw', this.database.values, async() => {
      let storable: INameIDStorable[] = values.map((resolved: INameIDStorable): INameIDStorable => {
        return { id: resolved.id, name: resolved.name }
      })
      try {
        await this.database.values.bulkAdd(storable)
      } catch (_e) {
        // console.log('error storing character name ids ' + e)
      }
    }).catch((_reason: any) => {
      // console.log('error storing character name ids: ' + reason)
    })
  }

  async getValuesByID(IDs: number[]): Promise<INameIDStorable[]> {

    return new Promise<IResolvedCharacter[]>((resolve, reject) => {
      this.database.transaction('r', this.database.values, () => {
        this.database.values
          .where('id'
        ).anyOf(IDs)
          .toArray()
          .then((values: INameIDStorable[]) => {
            resolve(values)
          })
          .catch((reason: any) => {
            reject('getValuesByID failed ' + reason)
          })
      }).catch((reason: any) => {
        reject('getValuesByID failed ' + reason)
      })
    })
  }

  async getValuesByName(names: string[]): Promise <INameIDStorable[] > {
    return new Promise<IResolvedCharacter[]>((resolve, reject) => {
      this.database.transaction('r', this.database.values, () => {
        this.database.values
          .where('name'
        ).anyOf(names)
          .toArray()
          .then((values: INameIDStorable[]) => {
            resolve(values)
          })
          .catch((reason: any) => {
            reject('getValuesByName failed ' + reason)
          })
      }).catch((reason: any) => {
        reject('getValuesByName failed ' + reason)
      })
    })
  }
}
