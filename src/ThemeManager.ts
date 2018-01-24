import { ThemeType, stringToThemeType, themeTypeToString } from './ThemeType'
import Dexie from 'dexie'

class ThemeDatabase extends Dexie {

  values: Dexie.Table<IStorableCurrentTheme, number>

  constructor() {
    super('Themes')
    this.version(1).stores({
      values: '++id,key,theme'
    })
  }
}

export default class ThemeManager implements IThemeManager {
  private database: ThemeDatabase

  constructor(indexedDB?: IDBFactory, keyRange?: IDBKeyRange) {
    if (indexedDB && keyRange) {

      Dexie.dependencies.IDBKeyRange = keyRange
      Dexie.dependencies.indexedDB = indexedDB

      this.database = new ThemeDatabase()
    }
  }

  async getCurrentTheme(): Promise<ThemeType> {
    return new Promise<ThemeType>((resolve) => {
      this.database.transaction('r', this.database.values, async() => {
        let themes = await this.database.values.toArray()
        if (themes.length === 1) {
          let theme = themes[0]
          let themeType: ThemeType = stringToThemeType(theme.name)
          resolve(themeType)
        } else {
          resolve(ThemeType.Light)
        }
      }).catch((_reason: any) => {
        resolve(ThemeType.Light)
      })
    })
  }

  setCurrentTheme(theme: ThemeType) {

    this.database.transaction('rw', this.database.values, async() => {
      const themeString = themeTypeToString(theme)
      await this.database.values.where('key').equals('current').delete()
      await this.database.values.add({ key: 'current', name: themeString })

    }).catch((_reason: any) => {
      /* noop */
    })

  }

  getAvailableThemes(): ThemeType[] {
    return [
      ThemeType.Light,
      ThemeType.Dark
    ]
  }
}
