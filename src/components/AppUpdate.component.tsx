import React from 'react'
import Button from 'material-ui/Button'
import AppUpdater from '../AppUpdater'

enum UpdateState {
  Hidden,
  Available,
  InProgress,
  ReadyToInstall,
  Error
}

export default class AppUpdate extends React.Component<IAppUpdateProps, IAppUpdateState> implements IAppUpdaterDelegate {

  appUpdater: AppUpdater

  constructor(props: IAppUpdateProps) {
    super(props)
    this.appUpdater = new AppUpdater(this)
    this.state = { state: UpdateState.Hidden, progress: 0 }

    this.handleRemindMeLaterClick = this.handleRemindMeLaterClick.bind(this)
    this.handleUpdateButton = this.handleUpdateButton.bind(this)
    this.handleInstallButton = this.handleInstallButton.bind(this)
  }

  handleRemindMeLaterClick() {
    this.setState({ })
  }
  handleUpdateButton() {
    this.appUpdater.download()
  }
  handleInstallButton() {
    this.appUpdater.install()
  }

  updaterCheckingForUpdates(_updater: IAppUpdater) {
    // noop
  }

  updateIsAvailable(_updater: IAppUpdater) {
    this.setState({ state: UpdateState.Available })
  }
  updateNotAvailable(_updater: IAppUpdater) {
    this.setState({ state: UpdateState.Hidden })
  }
  updateCheckError(_updater: IAppUpdater, _error: any) {
    this.setState({ state: UpdateState.Hidden })
  }
  updateDidProgress(_updater: IAppUpdater, progress: any) {
    this.setState({ state: UpdateState.InProgress, progress: progress })
  }
  updateDidDownload(_updater: IAppUpdater) {
    this.setState({ state: UpdateState.ReadyToInstall })
  }

  render(): JSX.Element {

    const updateBar = this.buildUpdateBar()
    return(updateBar)
  }

  private buildUpdateBar(): JSX.Element {
    const barStyle = {
      backgroundColor: '#3F51B5', // FIXME
      position: 'fixed' as 'fixed',
      bottom: 0,
      left: 0,
      right: 0
    }
    const barContentStyle = {
      display: 'flex',
      flexDirection: 'row' as 'row',
      flexWrap: 'nowrap' as 'nowrap',
      justifyContent: 'center' as 'center',
      alignContent: 'center' as 'center',
      alignItems: 'flex-start' as 'flex-start',
      'paddingTop': 8,
      'paddingBottom': 8,
      'paddingLeft': 32,
      'paddingRight': 32
    }

    const messageBoxStyle = {
      order: 0,
      flex: '0 1 auto',
      alignSelf: 'auto' as 'auto'
    }

    const buttonBoxStyle = {
      order: 0,
      flex: '0 1 auto',
      alignSelf: 'center' as 'center'
    }

    const messageStyle = {
      paddingLeft: 32,
      paddingRight: 32,
      color: 'white'
    }

    const buttonStyle = {
      textAlign: 'center',
      verticalAlign: 'middle',
      paddingLeft: 32,
      paddingRight: 32
    }

    let leftContents: JSX.Element = <div/>
    let rightContents: JSX.Element = <div/>
    switch (this.state.state) {
    case UpdateState.Available:
      leftContents = <p style = {messageStyle}>A new version of ELIT is available!</p>
      rightContents = <Button raised style={buttonStyle} onClick={this.handleUpdateButton}>Update</Button>
      break
    case UpdateState.ReadyToInstall:
      leftContents = <p style = {messageStyle}>Update ready to install!</p>
      rightContents = <Button raised style={buttonStyle} onClick={this.handleInstallButton}>Install and Relaunch</Button>
      break
    case UpdateState.InProgress:
      leftContents = <p style = {messageStyle}>Update Downloading... { Math.round(this.state.progress) }%</p>
      break
    }

    const bar = < div style = { barStyle } >
    <div style = { barContentStyle }>
      <div style = { messageBoxStyle }>
      { leftContents }
      </div>
      <div style = { buttonBoxStyle }>
       { rightContents }
      </div>
    </div >
  </div >

    switch (this.state.state) {
    case UpdateState.Hidden:
      return(<div />)
    case UpdateState.Error:
      return(<div />)
    case UpdateState.Available:
      return bar
    case UpdateState.InProgress:
      return bar
    case UpdateState.ReadyToInstall:
      return bar
    default:
      return(<div />)
    }
  }
}
