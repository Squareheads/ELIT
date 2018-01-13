import React from 'react'
const WebView = require('react-electron-web-view')

class ESIAPIForm extends React.Component {

  constructor(props: IAPIFormProps) {
    super(props)
    this.state = { }
  }

  render() {
    const url = 'https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=https%3A%2F%2F3rdpartysite.com%2Fcallback&client_id=3rdpartyClientId&scope=characterContactsRead%20characterContactsWrite&state=uniquestate123'

    const webiewStyle = {
      display: 'inline-flex',
      height: '100vh',
      width: '100%'
    }

    return (
      <WebView src={ url } style= {webiewStyle }/>
    )
  }
}

export default ESIAPIForm
