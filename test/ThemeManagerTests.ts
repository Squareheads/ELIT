import 'mocha'
import * as chai from 'chai'
import ThemeManager from '../src/ThemeManager'
import { ThemeType } from '../src/ThemeType'

describe('ThemeManager', () => {
  let manager: ThemeManager

  beforeEach(() => {
    const fakeIndexedDB = require('fake-indexeddb')
    const fakeIDBKeyRange = require('fake-indexeddb/lib/FDBKeyRange')

    manager = new ThemeManager(fakeIndexedDB, fakeIDBKeyRange)
  }),

  it('should restore default theme if none is saved', async() => {
    chai.assert.equal(await manager.getCurrentTheme(), ThemeType.Light)
  }),
  it('Should store current theme', async () => {
    manager.setCurrentTheme(ThemeType.Dark)
    chai.assert.equal(await manager.getCurrentTheme(), ThemeType.Dark)

    manager.setCurrentTheme(ThemeType.Light)
    chai.assert.equal(await manager.getCurrentTheme(), ThemeType.Light)

    manager.setCurrentTheme(ThemeType.Dark)
    chai.assert.equal(await manager.getCurrentTheme(), ThemeType.Dark)

    manager.setCurrentTheme(ThemeType.Light)
    chai.assert.equal(await manager.getCurrentTheme(), ThemeType.Light)
  }),
  it('should return list of themes', () => {
    chai.assert.deepEqual(manager.getAvailableThemes(), [ThemeType.Light, ThemeType.Dark])
  })

})
