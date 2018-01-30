import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
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

  handleChange(_event: any, index: number, _value: any) {
    this.setState({ index: index })
    this.themeManager.setCurrentTheme(this.state.themes[index])
  }
  render() {

    const menuItems = this.state.themes.map((theme: ThemeType) => {
      const text = themeTypeToString(theme)
      return <MenuItem value={this.state.themes.indexOf(theme)} primaryText={text} key={this.state.themes.indexOf(theme)} />
    })
    let divStyle = {
      backgroundColor: 'transparant'
    }
    return (
      <div style = { divStyle }>
        <SelectField floatingLabelText='Theme' value={this.state.index} onChange={this.handleChange}>
          { menuItems }
        </SelectField>
      </div>
    )
  }
}

export default ThemeSelector
