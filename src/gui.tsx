import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.component'
import ThemeManager from './ThemeManager'

const themeManager = new ThemeManager()

function renderAppPage() {
  ReactDOM.render(
    <App themeManager={ themeManager }/>,
    document.getElementById('root')
  )
}

renderAppPage()
