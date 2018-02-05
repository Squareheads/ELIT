import React from 'react'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'
import TextField from 'material-ui/TextField'
import KillInfoDisplay from './KillInfoDisplay.component'
import AnalyticsTracker from '../AnalyticsTracker'

class SearchForm extends React.Component<ISearchFormProps, ISearchFormState> {

  tracker: AnalyticsTracker
  characterLookup: ICharacterLookup
  killDataViewModelProvider: IKillDataViewModelProvider

  constructor(props: ISearchFormProps) {
    super(props)
    this.tracker = new AnalyticsTracker()
    this.state = { text: props.text || '', page: 'search-form' }
    this.characterLookup = props.characterLookup
    this.killDataViewModelProvider = props.killDataViewModelProvider
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleClear(_event: any) {
    this.setState({ page: 'search-form' })
  }

  handleTextAreaChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ text: event.currentTarget.value, page: 'search-form' })
  }

  handleSubmit(event: any) {
    const text = this.state.text
    this.tracker.event('SearchForm', 'Search')
    this.setState({ page: 'loading' })

    this.characterLookup.lookupCharacters(text)
    .then((values: ICharacterKillData[]) => {
      this.killDataViewModelProvider.viewModel(values).then((viewmodel) => {
        this.setState({ text: text, killInfo: viewmodel, page: 'kill-info' })
      }).catch((e) => {
        alert(e)
      })
    })
    .catch((reason: any) => {
      alert('ERROR:\n' + reason)
      this.setState({ text: text, page: 'search-form' })

    })
    event.preventDefault()
  }

  render() {
    switch (this.state.page) {
    case 'search-form':
      this.tracker.trackPage('/search', 'Search')
      return this.renderSearchForm()
    case 'loading':
      return this.renderLoading()
    case 'kill-info':
      this.tracker.trackPage('/search/kill-info', 'Search')
      return this.renderKillInfo()
    }
    this.tracker.trackPage('/search', 'Search')
    return this.renderSearchForm()
  }

  private renderLoading() {
    const divstyle: any = {
      position: 'fixed',
      right: '0px',
      bottom: '0px',
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparant'
    }

    return (
      <div style={divstyle} key='loading'>
        <CircularProgress size={80} thickness={5} />
      </div>
    )
  }

  private renderKillInfo() {
    const viewModel = this.state.killInfo || { characters: [] }
    return(
    <div>
      <KillInfoDisplay key='kill-info' viewModel = { viewModel }/>
      <Button raised color = 'secondary' onClick={this.handleClear} fullWidth={true}>Clear</Button>
    </div>
    )
  }

  private renderSearchForm() {

    const textareastyle = {
      display: 'inline-block',
      width: '100%'
    }

    return (
      <form onSubmit={this.handleSubmit} noValidate autoComplete='off'>
        <TextField
          id='textarea'
          label='Paste Local here'
          placeholder='Pilot names'
          multiline
          margin='normal'
          style={textareastyle}
          onChange={this.handleTextAreaChange}
          value={this.state.text}

        />
      <Button raised type='submit' color='secondary' fullWidth={true}>Search</Button>
      </form>
    )
  }
}

export default SearchForm
