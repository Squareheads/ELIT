import { app, BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import { autoUpdater } from 'electron-updater'
import { Keys } from './Keys'
import Raven from 'raven'

declare var __dirname: string
let mainWindow: Electron.BrowserWindow
const log = require('electron-log')
log.transports.file.level = 'debug'

function onReady() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false
    }
  })
  mainWindow.setTitle(require('../package.json').name)

  const fileName = `file://${__dirname}/index.html`
  mainWindow.loadURL(fileName)
  mainWindow.on('close', () => app.quit())

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  if (!isDev) {
    configureAppUpdate()
    setTimeout(() => {
      performAppUpdate()
    }, 5000)
  }

  Raven.config(Keys.SentryURL, {
    captureUnhandledRejections: true
  }).install()
}

app.on('ready', () => onReady())
app.on('window-all-closed', () => app.quit())
app.on('browser-window-created',function(_e, window) {
  window.setMenu(null)
})

ipcMain.on('theme' , (_event: string, arg: string) => {
  mainWindow.webContents.send('theme', arg)
})

function performAppUpdate() {
  log.debug('sending updater checking-for-update')
  autoUpdater.autoDownload = false
  autoUpdater.checkForUpdates()
}

function configureAppUpdate() {
  autoUpdater.logger = log

  autoUpdater.on('checking-for-update', () => {
    log.debug('sending updater checking-for-update')
    mainWindow.webContents.send('updater', 'checking-for-update')
  })
  autoUpdater.on('update-available', (info) => {
    log.debug('sending updater update-available')
    mainWindow.webContents.send('updater', 'update-available', info)
  })
  autoUpdater.on('update-not-available', (info) => {
    log.debug('sending updater update-not-available')
    mainWindow.webContents.send('updater', 'update-not-available', info)
  })
  autoUpdater.on('error', (err) => {
    log.debug('sending updater error')
    mainWindow.webContents.send('updater', 'error', err)
  })
  autoUpdater.on('download-progress', (progressObj) => {
    log.debug('sending updater download-progress')
    mainWindow.webContents.send('updater', 'download-progress', progressObj)
  })
  autoUpdater.on('update-downloaded', (info) => {
    log.debug('sending updater update-downloaded')
    mainWindow.webContents.send('updater', 'update-downloaded', info)
  })

  ipcMain.on('updater', (_event: any, type: string) => {
    if (type === 'download') {
      autoUpdater.downloadUpdate()
    }
    if (type === 'install') {
      autoUpdater.quitAndInstall()
    }
  })
}
