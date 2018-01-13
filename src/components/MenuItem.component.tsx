import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'

export default class MenuItem extends Component<IMenuItemProps, IMenuItemState> {
  clickHandler: (() => void)

  constructor(props: IMenuItemProps) {
    super(props)
    this.clickHandler = props.clickHandler
    this.state = { text: props.text, selected: props.selected, color: props.color, selectedColor: props.selectedColor }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.clickHandler()
  }

  render() {

    let color: string
    if (this.state.selected) {
      color = this.state.selectedColor
    } else {
      color = this.state.color
    }

    let key = 'menu-button-' + this.state.text + '-' + this.state.selected
    const style = {
      flexGrow: 1,
      textAlign: 'center',
      verticalAlign: 'middle',
      height: '50px'
    }
    return(<FlatButton key={key} style={style} onClick={this.handleClick} label={this.state.text} backgroundColor={color} />)
  }

}
