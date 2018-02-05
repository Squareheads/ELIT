import React, { Component } from 'react'
import Button from 'material-ui/Button'

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

    let color: 'primary' | 'secondary'
    if (this.state.selected) {
      color = 'primary' as 'primary'
    } else {
      color = 'secondary' as 'secondary'
    }

    let key = 'menu-button-' + this.state.text + '-' + this.state.selected
    const style = {
      flexGrow: 1,
      textAlign: 'center',
      verticalAlign: 'middle',
      height: '50px'
    }
    return(<Button raised key={key} style={style} onClick={this.handleClick} color={color}>{this.state.text}</Button>)
  }

}
