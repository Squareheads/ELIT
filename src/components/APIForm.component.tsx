import React from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import APIToken from '../APITokenModel'
import AnalyticsTracker from '../AnalyticsTracker'

class APIForm extends React.Component<IAPIFormProps, IAPIToken> {

  apiChecker: IAPIChecker
  apiStore: IAPITokenStore
  tracker: AnalyticsTracker

  constructor(props: IAPIFormProps) {
    super(props)
    this.tracker = new AnalyticsTracker()
    this.apiChecker = props.apiChecker
    this.apiStore = props.apiStore
    this.state = { keyID: '', verificationCode: '' }
    this.handleKeyIDChange = this.handleKeyIDChange.bind(this)
    this.handleVerificationCodeChange = this.handleVerificationCodeChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loadToken()
  }

  handleKeyIDChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ keyID: event.currentTarget.value })
  }

  handleVerificationCodeChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ verificationCode: event.currentTarget.value })
  }

  handleSubmit(event: any) {
    event.preventDefault()
    this.tracker.event('APIForm', 'Save')
    let token = new APIToken(this.state.keyID, this.state.verificationCode)
    this.checkAPIToken(token)
  }

  checkAPIToken(token: IAPIToken) {
    this.apiChecker.checkToken(token)
    .then((apiToken: IAPIToken) => {
      alert('token good ' + apiToken)
      this.saveToken(apiToken)
    })
    .catch((reason: any) => {
      alert('token bad' + reason)
    })
  }

  saveToken(token: IAPIToken) {
    this.apiStore.setToken(token)
  }

  loadToken() {
    this.apiStore.getToken()
      .then((token: IAPIToken) => {
        this.setState({ keyID: token.keyID, verificationCode: token.verificationCode })
      })
      .catch((_reason: any) => {
        this.setState({ keyID: '', verificationCode: '' })
      })
  }

  render() {
    this.tracker.trackPage('/apiform', 'APIForm')
    return (
      <form onSubmit={this.handleSubmit}>
      <TextField
      value={this.state.keyID}
      onChange={this.handleKeyIDChange}
      />
      <br/>
     <TextField
      value={this.state.verificationCode}
      onChange={this.handleVerificationCodeChange}
      />
      <br />
      <Button raised type='submit'>Save</Button>
      <br />
      </form>
    )
  }
}

export default APIForm
