export default class APIChecker implements IAPIChecker {

  connectionManager: IConnectionManager
  constructor(connectionManager: IConnectionManager) {
    this.connectionManager = connectionManager
  }

  checkToken(apiToken: IAPIToken): Promise<IAPIToken> {

    let baseURL: string = 'https://api.eveonline.com'
    let URI: string = '/account/APIKeyInfo.xml.aspx'
    let parameters: string = '?keyID=' + apiToken.keyID + '&vCode=' + apiToken.verificationCode
    let URL = baseURL + URI + parameters

    return new Promise<IAPIToken>(async (resolve, reject) => {
      try {
        await this.connectionManager.get(URL)
        resolve(apiToken)
      } catch (error) {
        reject('Bad Token')
      }
    })
  }
}
