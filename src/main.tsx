import { app, BrowserWindow } from 'electron'

declare var __dirname: string
let mainWindow: Electron.BrowserWindow

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
  // mainWindow.webContents.openDevTools()
}

app.on('ready', () => onReady())
app.on('window-all-closed', () => app.quit())
app.on('browser-window-created',function(_e, window) {
  window.setMenu(null)
})
