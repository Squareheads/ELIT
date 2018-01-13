
import 'mocha'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as mockery from 'mockery'

describe('ConnectionManager', () => {

  beforeEach(() => {
    mockery.enable({
      warnOnUnregistered: false,
      useCleanCache: true
    })
  }),

  afterEach(() => {
    mockery.deregisterAll()
    mockery.disable()
  }),

  it('Should make a GET request when get is called with a URL', (done) => {
    const requestStub = sinon.stub()
    requestStub.yields(null, { statusCode: 200 }, null)
    mockery.registerMock('request', requestStub)

    const ConnectionManager = require('../src/ConnectionManager')
    const connectionManager = new ConnectionManager.ConnectionManager('not_important')

    const promise = connectionManager.get('a_url')
    promise
    .then(() => { done() })
    .catch(() => { done() })

    sinon.assert.called(requestStub)
    const expectedURL = 'a_url'
    sinon.assert.calledWith(requestStub,
      { url: expectedURL, method: 'GET', headers: sinon.match.any },
       sinon.match.any)
  }),
  it('Should use the user agent provided', (done) => {
    const requestStub = sinon.stub()
    requestStub.yields(null, { statusCode: 200 }, null)
    mockery.registerMock('request', requestStub)

    const ConnectionManager = require('../src/ConnectionManager')
    const connectionManager = new ConnectionManager.ConnectionManager('a_user_agent')

    const promise = connectionManager.get('a_url')
    promise
    .then(() => { done() })
    .catch(() => { done() })

    const expectedUserAgent = 'a_user_agent'
    sinon.assert.calledWith(requestStub,
      { url: sinon.match.any, method: 'GET', headers: { 'User-Agent' : expectedUserAgent } },
       sinon.match.any)

  }),
  it('returns an error on non 200 response', () => {
    const requestStub = sinon.stub()
    requestStub.yields(null, { statusCode: 404 }, null)
    mockery.registerMock('request', requestStub)

    const ConnectionManager = require('../src/ConnectionManager')
    const connectionManager = new ConnectionManager.ConnectionManager('a_user_agent')

    const promise = connectionManager.get('a_url')
    return promise
    .then(() => {
      chai.assert.fail()
    })
    .catch((error: any) => {
      chai.assert.equal(error, 'get a_url failed: null code 404')
    })
  }),
  it('returns an error on http error', () => {
    const requestStub = sinon.stub()
    requestStub.yields('an error', { statusCode: 404 }, null)
    mockery.registerMock('request', requestStub)

    const ConnectionManager = require('../src/ConnectionManager')
    const connectionManager = new ConnectionManager.ConnectionManager('a_user_agent')

    const promise = connectionManager.get('a_url')
    return promise
    .then(() => {
      chai.assert.fail()
    })
    .catch((error: any) => {
      chai.assert.equal(error, 'get a_url failed: an error code 404')
    })
  })
})
