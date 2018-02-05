const request = require('request')

export class ConnectionManager implements IConnectionManager {
  userAgent: string

  constructor(userAgent: string) {
    this.userAgent = userAgent
  }

  async get(URL: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      request({
        method: 'GET',
        url: URL,
        headers: {
          'User-Agent': this.userAgent
        }
      }, function(err: any, response: any, body: any) {

        if (!err && response !== undefined && response.statusCode === 200) {
          resolve(body)
        } else {
          reject('get ' + URL + ' failed: ' + err + ' code ' + response.statusCode)
        }
      })
    })
  }
}
