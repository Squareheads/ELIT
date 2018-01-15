import { ipcRenderer } from 'electron'

export default class AppUpdater implements IAppUpdater {
  delegate: IAppUpdaterDelegate

  constructor(delegate: IAppUpdaterDelegate) {
    this.delegate = delegate
    this.setupListeners()
  }

  download() {
    ipcRenderer.send('updater', 'download')
  }
  install() {
    ipcRenderer.send('updater', 'install')
  }

  private setupListeners() {
    ipcRenderer.on('updater', (_event: any, name: string, object: any) => {
      switch (name) {
      case 'checking-for-update':
        this.delegate.updaterCheckingForUpdates(this)
        break
      case 'update-available':
        this.delegate.updateIsAvailable(this)
        break
      case 'update-not-available':
        this.delegate.updateNotAvailable(this)
        break
      case 'error':
        this.delegate.updateCheckError(this, object)
        break
      case 'download-progress':
        this.delegate.updateDidProgress(this, object.percent)
        break
      case 'update-downloaded':
        this.delegate.updateDidDownload(this)
        break
      default:
        console.log('unknown message, event: ' + event)
        break
      }
    })
  }
}
