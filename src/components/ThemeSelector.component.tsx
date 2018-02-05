import React from 'react'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import { ThemeType, themeTypeToString } from '../ThemeType'

class ThemeSelector extends React.Component<IThemeSelectorProps, IThemeSelectorState> {

  themeManager: IThemeManager

  constructor(props: IThemeSelectorProps) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.themeManager = props.themeManager
    this.state = {
      themes: this.themeManager.getAvailableThemes(),
      index: 1
    }

    this.themeManager.getCurrentTheme().then((theme) => {
      this.setState({ index: this.themeManager.getAvailableThemes().indexOf(theme) })
    }).catch((reason) => {
      console.log(reason)
    })
  }

  handleChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const index = parseInt(event.target.value, undefined)
    this.setState({ index: index })
    this.themeManager.setCurrentTheme(this.state.themes[index])
    event.preventDefault()
  }

  render() {

    const menuItems = this.state.themes.map((theme: ThemeType) => {
      const text = themeTypeToString(theme)
      return <MenuItem value={this.state.themes.indexOf(theme)} key={this.state.themes.indexOf(theme)}>{text}</MenuItem>
    })
    let divStyle = {
      backgroundColor: 'transparant'
    }
    return (
      <div style = { divStyle }>

        <FormControl>
          <InputLabel htmlFor='theme-simple'>Theme</InputLabel>
          <Select
            value={this.state.index}
            onChange={this.handleChange}
            input={<Input name='theme' id='theme-simple' />}
            autoWidth
          >
          { menuItems }
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default ThemeSelector
