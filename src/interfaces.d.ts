interface IAppUpdateProps {
} 

interface IAppUpdateState {
  state: UpdateState
  progress: number
}

interface IAppUpdater {
  delegate: IAppUpdateDelegate
  download()
  install()
}

interface IAppUpdaterDelegate {
  updaterCheckingForUpdates(updater: IAppUpdater)
  updateIsAvailable(updater: IAppUpdater)
  updateNotAvailable(updater: IAppUpdater)
  updateCheckError(updater: IAppUpdater, error: any)
  updateDidProgress(updater: IAppUpdater, progress: any)
  updateDidDownload(updater: IAppUpdater)
}

interface IAPIFormProps {
  apiChecker: IAPIChecker
  apiStore: IAPITokenStore
}

interface IAPIToken {
  keyID: string,
  verificationCode: string
}

interface IAPIChecker {
  checkToken(token: IAPIToken): Promise<IAPIToken>
}
  
interface IStatusMessageProps {
  statusMessage: IStatusMessage
}

interface IStatusMessage {
  message: string,
  success: Boolean
}

interface IAPITokenStore {
  setToken(token: IAPIToken)
  async getToken(): Promise<IAPIToken>
}

interface IAPITokenDataStorable {
  id?: number
  name: string
  keyID: string
  verificationCode: string
}


interface ISearchFormProps {
  characterLookup: ICharacterLookup
  killDataViewModelProvider: IKillDataViewModelProvider
  text?: string
} 
 
interface ISearchFormState {
  text: string
  killInfo?: IKillDataViewModel
  page: string
}

interface ICharacterLookup {
  lookupCharacters(text: string): Promise<ICharacterKillData[]>
}

interface ICharacterInfo {
  name: string
  characterID: string
} 

interface ICharacterIDResolver {
  async resolveNames(names: string[]): Promise<IResolvedCharacter[]>
  async resolveIDs(IDs: number[]): Promise<IResolvedCharacter[]>
}

interface IResolvedCharacter {
  name: string
  id: number
}

interface ICharacterAffiliationInfo {
  corporationName: string
  allianceName?: string
}

interface ICharacterAffiliationResolver {
  async getAffiliations(characterIDs: number[]): Promise<Dictionary<number,ICharacterAffiliationInfo>>
}
interface INameIDStore {
  store(values: INameIDStorable[])
  async getValuesByName(names: string[]): Promise<INameIDStorable[]>
  async getValuesByID(IDs: number[]): Promise<INameIDStorable[]>
}

interface INameIDStorable {
  id: number
  name: string
}

interface IAppComponentState {
  page: string
}

interface IAppComponentProps {
  
}


interface IMenuItemProps {
  text: string
  selected: boolean
  color: string
  selectedColor: string
  clickHandler: (() => void)
}

interface IMenuItemState {
  text: string  
  selected: boolean  
  color: string
  selectedColor: string
}

interface IConnectionManager {
  async get(URL: string): Promise<string>
}

interface ICharacterKillData {
  name: string
  id: number
  losses: ICharacterKillmail[]
  kills: ICharacterKillmail[]
}

interface IKillDataViewModel {
  characters: ICharacterKillDataViewModel[]
}
interface IFlownShip {
  name: string
  count: number
  losses: number
  killsWhileFlying: number
  id: number
}

interface ICharacterKillDataViewModel {
  name: string
  id: number
  corpName: string
  allianceName?: string
  characterImageURL: string
  dangerRatio?: number
  gangRatio?: number
  flownShips: IFlownShip[]
}

interface IKillDataViewModelProvider {
  async viewModel(data: ICharacterKillData[]): Promise<IKillDataViewModel>
}

interface IZKillStatisticsFetcher {
  async fetchStatistics(characterIds: number[]): Promise<Dictionary<number, IZKillStatisticsItem>>
}

interface IZKillStatisticsItem {
  characterId: number
  dangerRatio: number
  gangRatio: number
}

interface ICharacterKillmail {
  killmailID: number
  killmailTime: Date
  solarSystem: string
  victim: ICharacterKillmailVictim
  attackers: ICharacterKillmailAttacker[]
}

interface ICharacterKillmailVictim {
  damageTaken: number
  shipType: string
  shipId: number
  characterName: string
  coroporationID: number
  allianceID?: number
  items: ICharacterKillmailItem[]
}

interface ICharacterKillmailAttacker {
  securityStatus: number
  finalBlow: boolean
  characterName?: string
  corporationId?: number
  allianceId?: number
  factionId?: number
  shipType: string
  shipId: number
  weaponType?: string
}

interface ICharacterKillmailItem {
  itemType: string
}

interface IKillFetcher {
  async getKills(characters: IResolvedCharacter[]): Promise<IChracterKillData[]>
}

interface IEVETypeDatabase {
  nameForTypeID(typeID: number): string
}

interface IEVEKSpaceDatabase {
  nameForSolarSystemID(solarSystemID: number): string
}

interface IKillmailParser {
  parse(data: string): IZKillboardKillmaili[]
}

interface IZKillboardAttacker {
  security_status: number
  final_blow: boolean
  damage_done: number
  character_id?: number
  corporation_id?: number
  alliance_id?: number
  faction_id?: number
  ship_type_id: number
  weapon_type_id?: number
}

interface IZKillboardItem {
  item_type_id: number
  singleton: number
  flag: number
  quantity_destroyed?: number
  quantity_dropped?: number
}

interface IZKillboardKillMetaData {
  locationID: number
  hash: string
  fittedValue: number
  totalValue: number
  points: number
  npc: boolean
  solo: boolean
  awox: boolean
}

interface IZKillboardVictim {
  damage_taken: number
  ship_type_id: number
  character_id?: number
  corporation_id?: number
  alliance_id?: number
  faction_id?: number
  items: IZKillboardItem[]
}

interface IZKillboardKillmail {
  killmail_id: number
  killmail_time: string
  solar_system_id: number
  victim: IZKillboardVictim
  attackers: IZKillboardAttacker[]
  zkb: IZKillboardKillMetaData
}

interface IKillInfoDisplayProps {
  viewModel: IKillDataViewModel
} 

interface IKillDataShipPopover {
  open: boolean
  anchorEl: any
  characterIndex: number
}

interface IKillInfoDisplayState {
  viewModel: IKillDataViewModel
  shipPopover?: IKillDataShipPopover
}

interface AnalyticsEventOptions {
  evLabel?: string
  evValue?: string
  clientID?: string
}

interface IUniverseApi {
  postUniverseIds(
    names: Array<string>, 
    datasource?: string, 
    language?: string,
    userAgent?: string, 
    xUserAgent?: string): Promise<{ response: http.ClientResponse; body: PostUniverseIdsOk;}>

  postUniverseNames(
    ids: Array<number>, 
    datasource?: string, 
    userAgent?: string, 
    xUserAgent?: string): Promise<{ response: http.ClientResponse; body: Array<PostUniverseNames200Ok>;}>
}

declare class Analytics {
  constructor(trackingCode: string)
  pageview(hostname: string, url: string, title: string, clientID?: string)
  event(evCategory: string, evAction: string, options: AnalyticsEventOptions)
}

declare var analyticsClass = Analytics;

declare module 'electron-google-analytics' {
  export = analyticsClass;
}