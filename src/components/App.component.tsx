import React, { Component } from 'react'
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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Tabs, { Tab } from 'material-ui/Tabs'
import { ipcRenderer } from 'electron'
import { createMuiTheme, Theme } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
// import red from 'material-ui/colors/red'
// import cyan from 'material-ui/colors/cyan'
// import pink from 'material-ui/colors/pink'

export default class App extends Component<IAppComponentProps, IAppComponentState> {

  private themeManager: IThemeManager

  constructor(props: IAppComponentProps) {
    super(props)
    this.themeManager = props.themeManager
    this.state = {
      theme: ThemeType.Light,
      tab: 0
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

  handleChange = (_event: any, value: any) => {
    this.setState({ tab: value })
  }

  render() {
    const muiTheme = this.muiThemeFromTheme(this.state.theme)

    let color = this.canvasColorForTheme(muiTheme)

    const backgroundStyle = {
      backgroundColor: color,
      minHeight: '100vh'
    }

    const paddedStyle = {
      padding: '8px'
    }

    const tabValue = this.state.tab

    return (
      <MuiThemeProvider theme={muiTheme}>
      <div style = { backgroundStyle }>
      <div style = { paddedStyle }>
        <Paper>
        <Tabs
        fullWidth
        centered
         value = { tabValue }
         onChange={this.handleChange}
         textColor='secondary'
         >
          <Tab label='Search' />
          <Tab label='Settings' />
        </Tabs>
        </Paper>
        {tabValue === 0 && this.buildSearch()}
        {tabValue === 1 && this.buildSettings()}
        <AppUpdate />
        </div>
        </div>
      </MuiThemeProvider >

    )
  }

  private canvasColorForTheme(theme: Theme): string | undefined {
    let color: string | undefined = 'transparant'
    if (theme.palette) {
      color = theme.palette.background.default
    }

    return color
  }

  private darkTheme(): Theme {
    return createMuiTheme({
      palette: {
        type: 'dark'
      }
    })
  }

  private lightTheme(): Theme {
    return createMuiTheme({
      palette: {
        type: 'light'
      }
    })
  }
  private muiThemeFromTheme(theme: ThemeType): Theme {
    let muiTheme: Theme = this.lightTheme()

    switch (theme) {
    case ThemeType.Light:
      muiTheme = this.lightTheme()
      break
    case ThemeType.Dark:
      muiTheme = this.darkTheme()
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
