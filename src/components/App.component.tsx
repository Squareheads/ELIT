import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import SearchForm from './SearchForm.component'
import SettingsForm from './SettingsForm.component'
import AppUpdate from './AppUpdate.component'
import { CharacterLookup } from '../CharacterLookup'
import { CharacterIDResolver } from '../CharacterIDResolver'
import { ConnectionManager } from '../ConnectionManager'
import { ThemeType } from '../ThemeType'
import NameIDStore from '../NameIDStore'
import NameIDDatabase from '../NameIDDatabase'
import KillmailParser from '../KillmailParser'
import KillFetcher from '../KillFetcher'
import EVETypeDatabase from '../EVETypeDatabase'
import EVEKSpaceDatabase from '../EVEKSpaceDatabase'
import KillDataViewModelProvider from '../KillDataViewModelProvider'
import CharacterAffiliationResolver from '../CharacterAffiliationResolver'
import ZKillStatisticsFetcher from '../ZKillStatisticsFetcher'
import { UniverseApi } from 'eve-online-esi'
import { MuiTheme } from 'material-ui/styles'
import { Tabs, Tab } from 'material-ui/Tabs'

export default class App extends Component<IAppComponentProps, IAppComponentState> {

  private themeManager: IThemeManager

  constructor(props: IAppComponentProps) {
    super(props)
    this.themeManager = props.themeManager
    this.state = {
      theme: ThemeType.Light
    }

    this.themeManager.getCurrentTheme()
      .then((theme: ThemeType) => {
        this.setState({ theme: theme })

      })
      .catch((_reason: any) => {
        this.setState({ theme: ThemeType.Light })
      })
  }

  render() {
    let theme: MuiTheme = lightBaseTheme

    switch (this.state.theme) {
    case ThemeType.Light:
      theme = lightBaseTheme
      break
    case ThemeType.Dark:
      theme = darkBaseTheme
      break
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div>
          <div>
            <Tabs>
              <Tab label='Search' >
                <div>
                  {this.buildSearch()}
                </div>
              </Tab>
              <Tab label='Settings' >
                <div>
                  {this.buildSettings()}
                </div>
              </Tab>
            </Tabs>
          </div>
          <div>
            <AppUpdate />
          </div>
        </div>
      </MuiThemeProvider>

    )
  }

  private buildSearch(): JSX.Element {
    const connectionManager = new ConnectionManager('Eve-Intel (owen@squareheads.io')
    const characterNameIDDatabase = new NameIDDatabase('CharacterNameIDDatabase')
    const characterNameIDStore = new NameIDStore(characterNameIDDatabase)
    const kspaceDB = new EVEKSpaceDatabase()
    const itemDB = new EVETypeDatabase()
    const killmailParser = new KillmailParser()
    const universeApi = new UniverseApi()
    const characterResolver = new CharacterIDResolver(characterNameIDStore, universeApi)
    const killFetcher: IKillFetcher = new KillFetcher(connectionManager, killmailParser, kspaceDB, itemDB, characterResolver)
    const lookup = new CharacterLookup(characterResolver, killFetcher)
    const affiliationResolver = new CharacterAffiliationResolver()
    const statisticsFetcher = new ZKillStatisticsFetcher(connectionManager)
    const killDataViewModelProvider = new KillDataViewModelProvider(affiliationResolver, statisticsFetcher)
    const key = Math.random() + 'search'
    return <SearchForm characterLookup={lookup} killDataViewModelProvider={killDataViewModelProvider} key={key} />
  }

  private buildSettings(): JSX.Element {
    return <SettingsForm themeManager={this.themeManager} />
  }
}
