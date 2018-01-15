import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
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
  }

  handleTextAreaChange(event: React.FormEvent<HTMLTextAreaElement>) {
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
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }

    return (
      <div style={divstyle} key='loading'>
        <CircularProgress size={80} thickness={5} />
      </div>
    )
  }

  private renderKillInfo() {
    const viewModel = this.state.killInfo || { characters: [] }
    return (<KillInfoDisplay key='kill-info' viewModel = { viewModel }/>)
  }

  private renderSearchForm() {
    const divstyle = {
      height: '100vh',
      width: '100%'
    }
    const formstyle = {
      width: '100%',
      height: '80%'
    }
    const textareastyle = {
      display: 'inline-block',
      width: '100%'
    }

    return (
      <div style={divstyle} key='search-form'>
      <form style={formstyle} onSubmit={this.handleSubmit}>
      <TextField
      hintText='Pilot names'
      floatingLabelText='Paste Local here'
      multiLine={true}
      style={textareastyle}
      value={this.state.text}
      onChange={this.handleTextAreaChange}
    />
      <RaisedButton type='submit' label='Search' />
      </form>
      </div>
    )
  }
}

export default SearchForm
