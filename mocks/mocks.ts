export class MockAPITokenStore implements IAPITokenStore {
  tokenToReturn: IAPIToken
  getTokenCallCount: number

  constructor() {
    this.getTokenCallCount = 0
  }

  setToken(_token: IAPIToken) {
    /* noop */
  }
  async getToken(): Promise<IAPIToken> {
    this.getTokenCallCount += 1
    return new Promise<IAPIToken>((resolve, _reject) => {
      resolve(this.tokenToReturn)
    })
  }
}

export class MockCharacterIDResolver implements ICharacterIDResolver {
  capturedNames: string[]
  capturedIDs: number[]
  charactersToReturn: IResolvedCharacter[] = []

  async resolveIDs(IDs: number[]): Promise<IResolvedCharacter[]> {
    this.capturedIDs = IDs
    return new Promise<IResolvedCharacter[]>((resolve, _reject) => {
      resolve(this.charactersToReturn)
    })
  }

  async resolveNames(names: string[]): Promise<IResolvedCharacter[]> {

    this.capturedNames = names
    return new Promise<IResolvedCharacter[]>((resolve, _reject) => {
      resolve(this.charactersToReturn)
    })
  }
}

export class MockConnectionManager implements IConnectionManager {
  bodyToReturn: string = 'body'
  errorToReturn: string
  capturedURL: string
  capturedURLs: string[] = []

  async get(URL: string): Promise<string> {
    this.capturedURL = URL
    this.capturedURLs.push(URL)
    return new Promise<string>((resolve, reject) => {
      if (this.errorToReturn) {
        reject(this.errorToReturn)
      } else {
        resolve(this.bodyToReturn)
      }
    })
  }
}

export class MockKillFetcher implements IKillFetcher {
  capturedCharacters: IResolvedCharacter[]
  killsToReturn: ICharacterKillData[]

  async getKills(characters: IResolvedCharacter[]): Promise<ICharacterKillData[]> {
    return new Promise<ICharacterKillData[]>((resolve, _reject) => {
      this.capturedCharacters = characters
      resolve(this.killsToReturn)
    })
  }
}

export class MockKillmailParser implements IKillmailParser {
  capturedData: string
  killmailsToReturn: IZKillboardKillmail[]

  parse(data: string): IZKillboardKillmail[] {
    this.capturedData = data
    return this.killmailsToReturn
  }
}

export class MockCharacterNameIDStore implements INameIDStore {
  storedCharacters: INameIDStorable[]
  charactersToReturn: INameIDStorable[] = []
  capturedGetNames: string[]
  capturedGetIDs: number[]
  store(characters: INameIDStorable[]) {
    this.storedCharacters = characters
  }

  async getValuesByID(IDs: number[]): Promise<INameIDStorable[]> {
    this.capturedGetIDs = IDs
    return new Promise<INameIDStorable[]>((resolve, _reject) => {
      resolve(this.charactersToReturn)
    })
  }

  async getValuesByName(names: string[]): Promise<INameIDStorable[]> {
    this.capturedGetNames = names
    return new Promise<INameIDStorable[]>((resolve, _reject) => {
      resolve(this.charactersToReturn)
    })
  }

}

export namespace Data {

  export namespace CharacterIDResolver {
    export const twoCharacters: string = `
    <?xml version='1.0' encoding='UTF-8'?>
    <eveapi version="2">
      <currentTime>2017-12-11 08:41:01</currentTime>
      <result>
        <rowset name="characters" key="characterID" columns="name,characterID">
          <row name="Kellyl" characterID="580797163" />
          <row name="Sp4m" characterID="780702065" />
        </rowset>
      </result>
      <cachedUntil>2018-01-11 08:41:01</cachedUntil>
    </eveapi>
    `
    export const singleCharacter: string = `
    <?xml version='1.0' encoding='UTF-8'?>
    <eveapi version="2">
      <currentTime>2017-12-11 08:41:26</currentTime>
      <result>
        <rowset name="characters" key="characterID" columns="name,characterID">
          <row name="Kellyl" characterID="580797163" />
        </rowset>
      </result>
      <cachedUntil>2018-01-11 08:41:26</cachedUntil>
    </eveapi>
    `
    export const oneBadCharacter = `
    <?xml version='1.0' encoding='UTF-8'?>
    <eveapi version="2">
      <currentTime>2017-12-11 08:41:48</currentTime>
      <result>
        <rowset name="characters" key="characterID" columns="name,characterID">
          <row name="a" characterID="0" />
        </rowset>
      </result>
      <cachedUntil>2018-01-11 08:41:48</cachedUntil>
    </eveapi>
    `
    export const oneGoodOneBad = `
    <?xml version='1.0' encoding='UTF-8'?>
    <eveapi version="2">
      <currentTime>2017-12-11 08:42:16</currentTime>
      <result>
        <rowset name="characters" key="characterID" columns="name,characterID">
          <row name="a" characterID="0" />
          <row name="Kellyl" characterID="580797163" />
        </rowset>
      </result>
      <cachedUntil>2018-01-11 08:42:16</cachedUntil>
    </eveapi>`
  }
}
