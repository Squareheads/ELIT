
import React, { Component } from 'react'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'
import { MenuList, MenuItem } from 'material-ui/Menu'
import { KeyboardArrowDown } from 'material-ui-icons'
import Tooltip from 'material-ui/Tooltip'
import { interestingDataPointDescription } from '../InterestingDataPointType'

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
    paddingLeft:  '0px',
    paddingRight: '0px',
    width: 34
  },
  nameCell: {
    width: 80,
    whiteSpace: 'normal'
  },
  corpCell: {
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

    let divStyle = {
      backgroundColor: 'transparant',
      overflow: 'scroll' as 'scroll'
    }
    const popover = this.shipPopoverElement()
    return(
    <div style = { divStyle }>
      <Table>
        { this.tableHeader() }
        <TableBody>
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
      onClick={() => this.handleNameShipPopoverClick(popoverIndex, ship)}>
      { ship.name + '(' + ship.killsWhileFlying + 'kills while flying, ' + ship.losses + 'losses)' }
      </MenuItem>
    })

    return(
    <Popover open={ popoverOpen }
    anchorEl={ popoverAnchorEl }
    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
    onClose={this.handleRequestClose}>
      <MenuList>
        { menuItems }
      </MenuList>
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
    <TableHead>
      <TableRow>
      <TableCell style = { styles.imageColumnStyle }></TableCell>
      <TableCell style = { styles.nameCell }>Capsuleer</TableCell>
      <TableCell style = { styles.corpCell }>Affiliation</TableCell>
      <TableCell>Recent Ships</TableCell>
      <TableCell style = { styles.imageColumnStyle }>POI</TableCell>
      <TableCell style = { styles.numberCellStyle }>Gang</TableCell>
      <TableCell style = { styles.numberCellStyle }>Danger</TableCell>
      </TableRow>
    </TableHead>
    )
  }
  private rowForCharacter(character: ICharacterKillDataViewModel, characterIndex: number): JSX.Element {

    let lastFlownShipElement: JSX.Element
    if (character.flownShips[0] && character.flownShips[0].name) {
      const recentShipNames = character.flownShips.slice(0,3).map((ship) => { return ship.name }).join(', ')
      const discloseShipButton = <IconButton id={'' + characterIndex} onClick={this.handleShipNameClick}><KeyboardArrowDown/></IconButton>
      lastFlownShipElement = <TableCell>{ discloseShipButton } { recentShipNames }</TableCell>
    } else {

      const noShipStyle = {
        fontStyle:  'italic' as 'italic',
        color: '#757575'
      }
      lastFlownShipElement = <TableCell style={ noShipStyle }>No ship data</TableCell>
    }

    const avatarStyles = {
      character: {
        width: 50,
        height: 50
      },
      poi: {
        width: 25,
        height: 25
      }
    }
    const image = <Avatar src={ character.characterImageURL } style = { avatarStyles.character } />

    const poiImages = character.interestingDataPoints.map((point) => {

      return <Tooltip id={'poitooltip-' + point.type} key={'poitooltip-' + point.type} title= { interestingDataPointDescription(point.type) }>
        <Avatar key={'poiimage-' + point.type } src={ point.image } style = { avatarStyles.poi } />
      </Tooltip>
    })
    let affiliationText = '[' + character.corpName + ']'
    if (character.allianceName) {
      affiliationText += '\n' + '<' + character.allianceName + '>'
    }
    return (
      <TableRow key = { character.id }>
        <TableCell style={ styles.tableRowImageSizeStyle }>{ image }</TableCell>
        <TableCell style = { styles.nameCell }>{ character.name }</TableCell>
        <TableCell style = { styles.corpCell }>{ affiliationText }</TableCell>
        { lastFlownShipElement }
        <TableCell style = { styles.tableRowImageSizeStyle }>{ poiImages }</TableCell>
        <TableCell style = { styles.numberCellStyle }>{ character.gangRatio || 0 }%</TableCell>
        <TableCell style = { styles.numberCellStyle }>{ character.dangerRatio || 0 }%</TableCell>
      </TableRow >
    )
  }
}
