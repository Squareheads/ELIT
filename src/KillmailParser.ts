export default class KillmailParser implements IKillmailParser {
  parse(data: string): IZKillboardKillmail[] {
    const object: IZKillboardKillmail[] = JSON.parse(data)
    return object
  }
}
