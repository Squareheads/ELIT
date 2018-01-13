import React from 'react'

class StatusMessage extends React.Component<IStatusMessageProps, IStatusMessage> {
  constructor(props: IStatusMessageProps) {
    super(props)
    this.state = props.statusMessage
  }

  render() {
    return (
      <div>
        {this.state.message}
        </div>
    )
  }
}

export default StatusMessage
