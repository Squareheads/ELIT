
export default class APIToken implements IAPIToken {
  public keyID: string
  public verificationCode: string

  constructor(keyID: string, verificationCode: string) {
    this.keyID = keyID
    this.verificationCode = verificationCode
  }
}
