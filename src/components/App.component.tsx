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
import { ThemeType, stringToThemeType } from '../ThemeType'
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
import { ipcRenderer } from 'electron'

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

    ipcRenderer.on('theme', (_event: string, arg: string) => {
      const newTheme = stringToThemeType(arg)
      this.setState({ theme: newTheme })
    })
  }

  render() {

    let theme: MuiTheme = this.muiThemeFromTheme(this.state.theme)
    let color = this.canvasColorForTheme(theme)

    const canvasStyle = {
      position: 'fixed' as 'fixed',
      bottom: '0px',
      right: '0px',
      width: '100vw',
      height: '100vh',
      backgroundColor: color
    }

    const divStyle = {
      backgroundColor: color,
      padding: '8px'
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <div style = { canvasStyle }>
      <div style = { divStyle }>
        <Tabs>
          <Tab label='Search' >
            {this.buildSearch()}
          </Tab>
          <Tab label='Settings' >
            {this.buildSettings()}
          </Tab>
        </Tabs>
        <AppUpdate />
        </div>
        </div>
      </MuiThemeProvider>

    )
  }

  private canvasColorForTheme(theme: MuiTheme): string | undefined {
    let color: string | undefined = 'transparant'
    if (theme.palette) {
      color = theme.palette.canvasColor
    }

    return color
  }

  private muiThemeFromTheme(theme: ThemeType): MuiTheme {
    let muiTheme: MuiTheme = lightBaseTheme

    switch (theme) {
    case ThemeType.Light:
      muiTheme = lightBaseTheme
      break
    case ThemeType.Dark:
      muiTheme = darkBaseTheme
      break
    }

    return muiTheme
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
