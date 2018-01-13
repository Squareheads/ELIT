import APIToken from './APITokenModel'
import Dexie from 'dexie'

class APITokenDatabase extends Dexie {
  apiTokens: Dexie.Table<IAPITokenDataStorable
  ,number>

  constructor() {
    super('APITokenDatabase')
    this.version(1).stores({
      apiTokens: '++id,name,keyID,verificationCode'
    })
  }
}

export class APITokenStore implements IAPITokenStore {

  database: APITokenDatabase
  constructor() {
    this.database = new APITokenDatabase()
  }

  async getToken(): Promise<IAPIToken> {
    return new Promise<IAPIToken>((resolve, reject) => {
      this.database.transaction('r', this.database.apiTokens, async() => {
        let tokens = await this.database.apiTokens.toArray()
        if (tokens.length === 1) {
          let token = tokens[0]
          resolve(new APIToken(token.keyID, token.verificationCode))
        } else {
          resolve()
        }
      }).catch((reason: any) => {
        reject('get token failed: ' + reason)
      })
    })
  }

  setToken(token: IAPIToken) {
    this.database.transaction('rw', this.database.apiTokens, async() => {

      if ((await this.database.apiTokens.where('name').equals('singletoken').count()) === 0) {
        await this.database.apiTokens.add({ name: 'singletoken', keyID: token.keyID, verificationCode: token.verificationCode })
      } else {
        await this.database.apiTokens.where('name').equals('singletoken').delete()
        await this.database.apiTokens.add({ name: 'singletoken', keyID: token.keyID, verificationCode: token.verificationCode })
      }
    }).catch((_reason: any) => {
      /* noop */
    })
  }
}
