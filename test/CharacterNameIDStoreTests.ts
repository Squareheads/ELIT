import { mock, instance, anything, reset, when } from 'ts-mockito'
import 'mocha'
import { expect } from 'chai'
import NameIDStore from '../src/NameIDStore'
import NameIDDatabase from '../src/NameIDDatabase'

const mockedDB: NameIDDatabase = mock(NameIDDatabase)
const database: NameIDDatabase = instance(mockedDB)
const store = new NameIDStore(database)

describe('NameIDStore', () => {
  it('should start a transaction when storing', () => {
    let capturedCatchCalled = false
    let returning: any = { catch: ((_e: any) => { capturedCatchCalled = true }) }
    when(mockedDB.transaction('rw', anything(), anything())).thenReturn(returning)

    store.store([])
    expect(capturedCatchCalled).to.equal(true)

  }),
  afterEach(() => {
    reset(mockedDB)
  })
})
