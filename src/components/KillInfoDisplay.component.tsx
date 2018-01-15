
import React, { Component } from 'react'
import Table from 'material-ui/Table/Table'
import TableRow from 'material-ui/Table/TableRow'
import TableBody from 'material-ui/Table/TableBody'
import TableHeader from 'material-ui/Table/TableHeader'
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

const styles = {
  tableRowImageSizeStyle:  {
    paddingLeft:  '0px',
    paddingRight: '0px',
    width: 50
  },
  disclosureButton: {
    width:  '50px',
    height: '50px'
  },
  imageColumnStyle: {
    paddingLeft:  '0px',
    paddingRight: '0px',
    width: 50
  },
  numberCellStyle: {
    width: 34
  },
  nameCell: {
    width: 80,
    whiteSpace: 'normal'
  },
  corpCell: {
    width: 80,
    whiteSpace: 'normal'
  },
  allianceCell: {
    width: 80,
    whiteSpace: 'normal'
  }
}

export default class KillInfoDisplay extends Component<IKillInfoDisplayProps, IKillInfoDisplayState> {

  constructor(props: IKillInfoDisplayProps) {
    super(props)
    this.state = { viewModel: props.viewModel }
    this.handleShipNameClick = this.handleShipNameClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleNameShipPopoverClick = this.handleNameShipPopoverClick.bind(this)
  }

  render() {
    const characters = this.state.viewModel.characters
    const rows = characters.map((character) => {
      const index = this.state.viewModel.characters.indexOf(character)
      return this.rowForCharacter(character, index)
    })

    const popover = this.shipPopoverElement()
    return(
    <div>
      <Table fixedHeader={true} fixedFooter={true} selectable={false} multiSelectable={false}>
        { this.tableHeader() }
        <TableBody displayRowCheckbox = {false} selectable = {false} >
          { rows }
        </TableBody>
      </Table>
      { popover }

    </div >
    )
  }

  private shipPopoverElement(): JSX.Element {
    if (this.state.viewModel.characters.length === 0) {
      return <div />
    }

    let popoverOpen = false
    let popoverAnchorEl = undefined
    let popoverIndex = 0
    if (this.state.shipPopover) {
      popoverOpen = this.state.shipPopover.open
      popoverAnchorEl = this.state.shipPopover.anchorEl
      popoverIndex = this.state.shipPopover.characterIndex
    }
    const menuItems = this.state.viewModel.characters[popoverIndex].flownShips
    .slice(0,6)
    .map((ship: IFlownShip): JSX.Element => {
      return <MenuItem key={ ship.name + '-' + ship.count }
      primaryText={ ship.name + '(' + ship.killsWhileFlying + 'kills while flying, ' + ship.losses + 'losses)' }
      onClick={() => this.handleNameShipPopoverClick(popoverIndex, ship)}/>
    })

    return(
    <Popover open={ popoverOpen }
    anchorEl={ popoverAnchorEl }
    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
    onRequestClose={this.handleRequestClose}
    animation={PopoverAnimationVertical}>

      <Menu>
        { menuItems }
      </Menu>
    </Popover >)
  }
  private handleRequestClose(_event: any) {
    this.setState({
      shipPopover: {
        open: false,
        anchorEl: undefined,
        characterIndex: 0
      }
    })
  }

  private handleNameShipPopoverClick(characterIndex: number, ship: IFlownShip) {
    const character = this.state.viewModel.characters[characterIndex]
    console.log('handle ship pick ' + ship + ' from ' + character.name + ' (' + character.id + ')')
  }
  private handleShipNameClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (!event.currentTarget.id) {
      return
    }

    const characterIndex = Number(event.currentTarget.id)

    this.setState({
      shipPopover: {
        open: true,
        anchorEl: event.target,
        characterIndex: characterIndex
      }
    })
  }

  private tableHeader(): JSX.Element {

    return (
    <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
      <TableRow>
      <TableHeaderColumn style = { styles.imageColumnStyle }></TableHeaderColumn>
      <TableHeaderColumn style = { styles.nameCell }>Capsuleer</TableHeaderColumn>
      <TableHeaderColumn style = { styles.corpCell }>Corporation</TableHeaderColumn>
      <TableHeaderColumn style = { styles.corpCell }>Alliance</TableHeaderColumn>
      <TableHeaderColumn>Recent Ships</TableHeaderColumn>
      <TableHeaderColumn style = { styles.numberCellStyle }>Gang</TableHeaderColumn>
      <TableHeaderColumn style = { styles.numberCellStyle }>Danger</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    )
  }
  private rowForCharacter(character: ICharacterKillDataViewModel, characterIndex: number): JSX.Element {

    let lastFlownShipElement: JSX.Element
    if (character.flownShips[0] && character.flownShips[0].name) {
      const recentShipNames = character.flownShips.slice(0,3).map((ship) => { return ship.name }).join(', ')
      const discloseShipButton = <IconButton id={'' + characterIndex} onClick={this.handleShipNameClick}><KeyboardArrowDown/></IconButton>
      lastFlownShipElement = <TableRowColumn>{ discloseShipButton } { recentShipNames }</TableRowColumn>
    } else {

      const noShipStyle = {
        fontStyle:  'italic' as 'italic',
        color: '#757575'
      }
      lastFlownShipElement = <TableRowColumn style={ noShipStyle }>No ship data</TableRowColumn>
    }
    const image = <Avatar src={ character.characterImageURL } size = { 50 } />

    return (
      <TableRow key = { character.id }>
        <TableRowColumn style={ styles.tableRowImageSizeStyle }>{ image }</TableRowColumn>
        <TableRowColumn style = { styles.nameCell }>{ character.name }</TableRowColumn>
        <TableRowColumn style = { styles.corpCell }>{ character.corpName }</TableRowColumn>
        <TableRowColumn style = { styles.allianceCell }>{ character.allianceName }</TableRowColumn>
        { lastFlownShipElement }
        <TableRowColumn style = { styles.numberCellStyle }>{ character.gangRatio || 0 }%</TableRowColumn>
        <TableRowColumn style = { styles.numberCellStyle }>{ character.dangerRatio || 0 }%</TableRowColumn>
      </TableRow >
    )
  }
}
