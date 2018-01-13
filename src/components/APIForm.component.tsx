import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { ipcRenderer } from 'electron'
import APIToken from '../APITokenModel'

class APIForm extends React.Component<IAPIFormProps, IAPIToken> {

  apiChecker: IAPIChecker
  apiStore: IAPITokenStore

  constructor(props: IAPIFormProps) {
    super(props)
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
    ipcRenderer.send('check-api-token', this.state)
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
    return (
      <form onSubmit={this.handleSubmit}>
      <TextField
      hintText='keyID'
      floatingLabelText='Enter API Key ID'
      floatingLabelFixed={true}
      value={this.state.keyID}
      onChange={this.handleKeyIDChange}
      />
      <br/>
     <TextField
      hintText='verificationCode'
      floatingLabelText='Enter API Verification Code'
      floatingLabelFixed={true}
      value={this.state.verificationCode}
      onChange={this.handleVerificationCodeChange}
      />
      <br />
      <RaisedButton type='submit' label='Save' />
      <br />
      </form>
    )
  }
}

export default APIForm
