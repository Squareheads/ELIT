import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.component'
import ThemeManager from './ThemeManager'
import Raven from 'raven-js'
import { Keys } from './Keys'

const themeManager = new ThemeManager()

function renderAppPage() {
  ReactDOM.render(
    <App themeManager={ themeManager }/>,
    document.getElementById('root')
  )
}

renderAppPage()

Raven.config(Keys.SentryURL).install()
window.addEventListener('unhandledrejection', function (event) {
  const rejectionEvent = event as PromiseRejectionEvent
  if (rejectionEvent) {
    Raven.captureException(rejectionEvent.reason)
  }
})
