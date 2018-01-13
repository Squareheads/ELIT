import Dexie from 'dexie'

export default class NameIDDatabase extends Dexie {

  values: Dexie.Table<INameIDStorable,number>

  constructor(name: string) {
    super(name)
    this.version(1).stores({
      values: 'id,name'
    })
  }
}
