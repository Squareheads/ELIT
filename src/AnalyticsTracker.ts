import Analytics from 'electron-google-analytics'
import machineUuid from 'machine-uuid'
import { Keys } from './Keys'

export default class AnalyticsTracker {
  private gaTracker: Analytics
  private clientId: string
  constructor() {

    this.clientId = ''

    machineUuid((uuid: string) => {
      this.clientId = uuid
    })

    this.gaTracker = new Analytics(Keys.GATrackingCode)
  }

  trackPage(pageURL: string, pageTitle: string) {

    this.gaTracker.pageview('hostname', pageURL, pageTitle, this.clientId)
  }

  event(category: string, action: string) {
    this.gaTracker.event(category, action, { clientID: this.clientId })
  }
}
