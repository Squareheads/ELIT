import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SearchForm from './SearchForm.component'
import APIForm from './APIForm.component'
import MenuItem from './MenuItem.component'
import ESIAPIForm from './ESIAPIForm.component'
import APIChecker from '../APIChecker'
import { APITokenStore } from '../APITokenStore'
import { CharacterLookup } from '../CharacterLookup'
import { CharacterIDResolver } from '../CharacterIDResolver'
import { ConnectionManager } from '../ConnectionManager'
import NameIDStore from '../NameIDStore'
import NameIDDatabase from '../NameIDDatabase'
import KillmailParser from '../KillmailParser'
import KillFetcher from '../KillFetcher'
import EVETypeDatabase from '../EVETypeDatabase'
import EVEKSpaceDatabase from '../EVEKSpaceDatabase'
import KillDataViewModelProvider from '../KillDataViewModelProvider'
import CharacterAffiliationResolver from '../CharacterAffiliationResolver'
import ZKillStatisticsFetcher from '../ZKillStatisticsFetcher'

const Pages = {
  Search: 'Search',
  Settings: 'Settings',
  ESIAPI: 'ESIAPI'
}

export default class App extends Component<IAppComponentProps, IAppComponentState> {

  constructor(props: IAppComponentProps) {
    super(props)
    this.state = {
      page: Pages.Search
    }
    this.handleSearchMenuClicked = this.handleSearchMenuClicked.bind(this)
    this.handleSettingsMenuClicked = this.handleSettingsMenuClicked.bind(this)
    this.handleESIAPIMenuClicked = this.handleESIAPIMenuClicked.bind(this)
  }

  render() {
    const menucontainer = {
      width: '100%',
      display: 'flex'
    }

    let searchSelected = (this.state.page === Pages.Search)
    let settingsSelected = (this.state.page === Pages.Settings)
    let esiapiSelected = (this.state.page === Pages.ESIAPI)

    let contents = this.buildContents()
    let searchMenuKey = 'menu-button-search-selected-' + searchSelected
    let settingsMenuKey = 'menu-button-settings-selected-' + settingsSelected
    let esiapiMenuKey = 'menu-button-esiapi-selected-' + esiapiSelected

    return (
      <MuiThemeProvider>
      <div>
        <div style={menucontainer}>
        <MenuItem key = {searchMenuKey} text = 'Search' selected = {searchSelected} color = '#566D7E' selectedColor = '#4863A0' clickHandler ={ this.handleSearchMenuClicked } />
        <MenuItem key = {settingsMenuKey} text = 'Settings' selected = {settingsSelected} color = '#566D7E' selectedColor = '#4863A0' clickHandler ={ this.handleSettingsMenuClicked } />
        <MenuItem key = {esiapiMenuKey} text = 'API' selected = {esiapiSelected} color = '#566D7E' selectedColor = '#4863A0' clickHandler ={ this.handleESIAPIMenuClicked } />
        </div>
        <div>
          { contents }
        </div>
      </div>
      </MuiThemeProvider>

    )
  }

  private handleSearchMenuClicked() {
    this.setState({ page: Pages.Search })
  }

  private handleSettingsMenuClicked() {
    this.setState({ page: Pages.Settings })
  }

  private handleESIAPIMenuClicked() {
    this.setState({ page: Pages.ESIAPI })
  }

  private buildContents(): JSX.Element {
    const apiStore = new APITokenStore()
    const connectionManager = new ConnectionManager('Eve-Intel (owen@squareheads.io')
    const apiChecker = new APIChecker(connectionManager)
    switch (this.state.page) {
    case Pages.Search:
      const characterNameIDDatabase = new NameIDDatabase('CharacterNameIDDatabase')
      const characterNameIDStore = new NameIDStore(characterNameIDDatabase)
      const kspaceDB = new EVEKSpaceDatabase()
      const itemDB = new EVETypeDatabase()
      const killmailParser = new KillmailParser()
      const characterResolver = new CharacterIDResolver(apiStore, connectionManager, characterNameIDStore)
      const killFetcher: IKillFetcher = new KillFetcher(connectionManager, killmailParser, kspaceDB, itemDB, characterResolver)
      const lookup = new CharacterLookup(apiStore,characterResolver, killFetcher)
      const affiliationResolver = new CharacterAffiliationResolver()
      const statisticsFetcher = new ZKillStatisticsFetcher(connectionManager)
      const killDataViewModelProvider = new KillDataViewModelProvider(affiliationResolver, statisticsFetcher)
      const key = Math.random() + 'search'
      return <SearchForm characterLookup={lookup} killDataViewModelProvider={killDataViewModelProvider} key={ key }/>
    case Pages.Settings:
      return <APIForm apiChecker={apiChecker} apiStore={apiStore}/>
    case Pages.ESIAPI:
      return <ESIAPIForm/>

    default:
      return <div key='unknown-page'>PAGE {this.state.page} NOT FOUND</div>
    }
  }
}
