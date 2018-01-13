import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.component'

function renderAppPage() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

renderAppPage()
