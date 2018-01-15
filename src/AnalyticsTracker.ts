import Analytics from 'electron-google-analytics'
import isDev from 'electron-is-dev'

export default class AnalyticsTracker {
  private gaTracker: Analytics
  private clientId: string
  constructor() {

    this.clientId = 'fixme123'

    if (isDev) {
      this.gaTracker = new Analytics('UA-81511553-3')

    } else {
      this.gaTracker = new Analytics('UA-81511553-2')
    }
  }

  trackPage(pageURL: string, pageTitle: string) {

    this.gaTracker.pageview('hostname', pageURL, pageTitle, this.clientId)
    console.log('sent pageView ' + pageURL + ' ' + pageTitle)
  }

  event(category: string, action: string) {
    this.gaTracker.event(category, action, { clientID: this.clientId })
    console.log('sent event ' + category + ' ' + action)
  }
}