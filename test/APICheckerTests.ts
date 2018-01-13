
import 'mocha'
import * as chai from 'chai'
import APIToken from '../src/APITokenModel'
import APIChecker from '../src/APIChecker'

import * as mocks from '../mocks/mocks'

describe('APIChecker', () => {
  let connectionManager: mocks.MockConnectionManager
  let checker: APIChecker

  beforeEach(() => {
    connectionManager = new mocks.MockConnectionManager()
    checker = new APIChecker(connectionManager)
  }),

  it('Should make an API Request to the correct URL', (done) => {

    const token = new APIToken('a_key_id', 'a_verification_code')
    const promise = checker.checkToken(token)
    promise
    .then(() => { done() })
    .catch(() => { done() })

    const expectedURL = 'https://api.eveonline.com/account/APIKeyInfo.xml.aspx?keyID=a_key_id&vCode=a_verification_code'
    chai.assert.equal(connectionManager.capturedURL, expectedURL)

  }),

  it('Returns a token on success', () => {

    const token = new APIToken('a_key_id', 'a_verification_code')
    const promise = checker.checkToken(token)

    return promise
    .then((token: IAPIToken) => {
      chai.assert.equal(token.keyID, 'a_key_id')
      chai.assert.equal(token.verificationCode, 'a_verification_code')
    })
    .catch(() => {
      chai.assert.fail()
    })
  }),
  it('Returns an error on http error', () => {
    const token = new APIToken('a_key_id', 'a_verification_code')
    connectionManager.errorToReturn = 'Bad Response'
    return checker.checkToken(token)
    .then(() => {
      chai.assert.fail()
    })
    .catch((error: any) => {
      chai.assert.equal(error, 'Bad Token')
    })

  })
})
