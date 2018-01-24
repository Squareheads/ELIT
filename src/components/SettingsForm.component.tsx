import React from 'react'
import AnalyticsTracker from '../AnalyticsTracker'

class SettingsForm extends React.Component<ISettingsFormProps, ISettingsFormState> {

  themeManager: IThemeManager
  tracker: AnalyticsTracker

  constructor(props: ISettingsFormProps) {
    super(props)
    this.tracker = new AnalyticsTracker()
    this.themeManager = props.themeManager
    this.state = { }
  }

  render() {
    this.tracker.trackPage('/settingsform', 'SettingsForm')
    return (
      <div />
    )
  }
}

export default SettingsForm
