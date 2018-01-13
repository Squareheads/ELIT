
import 'mocha'
import * as chai from 'chai'

import EVETypeDatabase from '../src/EVETypeDatabase'

describe('EVETypeDatabase', () => {
  const db = new EVETypeDatabase()

  it('Should return the name of a type ID for System 1', () => {
    chai.assert.equal(db.nameForTypeID(0), '#System')
  }),
  it('Should return the name of a type ID for Neutron Blaster 3178', () => {
    chai.assert.equal(db.nameForTypeID(3178), 'Light Neutron Blaster II')
  }),
  it('Should return the name of a type ID for Taranis 11200', () => {
    chai.assert.equal(db.nameForTypeID(11200), 'Taranis')
  })
})
