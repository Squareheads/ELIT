
import 'mocha'
import * as chai from 'chai'
import KillmailParser from '../src/KillmailParser'
import { killmailMocks } from './killmailMocks'

describe('KillmailParser', () => {
  let parser: KillmailParser

  beforeEach(() => {
    parser = new KillmailParser()
  }),

  it('should parse things', () => {
    const kills: IZKillboardKillmail[] = parser.parse(killmailMocks.simpleResponse)

    chai.assert.equal(kills.length, 1)

    chai.assert.equal(kills[0].killmail_id, 66438342)
    chai.assert.equal(kills[0].killmail_time, '2017-12-07T19:17:09Z')
    chai.assert.equal(kills[0].solar_system_id, 30004984)

    chai.assert.equal(kills[0].victim.damage_taken, 4308)
    chai.assert.equal(kills[0].victim.character_id, 2112957068)
    chai.assert.equal(kills[0].victim.corporation_id, 98527509)
    chai.assert.equal(kills[0].victim.alliance_id, 99004570)

    chai.assert.equal(kills[0].victim.items.length, 19)
    chai.assert.equal(kills[0].victim.items[0].item_type_id, 27333)
    chai.assert.equal(kills[0].victim.items[0].singleton, 0)
    chai.assert.equal(kills[0].victim.items[0].flag, 29)
    chai.assert.equal(kills[0].victim.items[0].quantity_destroyed, 37)

    chai.assert.equal(kills[0].zkb.locationID, 40315574)
    chai.assert.equal(kills[0].zkb.hash, 'e1e01fe40e50b169607febd94919feb7615779d0')
    chai.assert.equal(kills[0].zkb.fittedValue, 27282843.86)
    chai.assert.equal(kills[0].zkb.totalValue, 27557304.11)
    chai.assert.equal(kills[0].zkb.points, 18)
    chai.assert.equal(kills[0].zkb.npc, false)
    chai.assert.equal(kills[0].zkb.solo, true)
    chai.assert.equal(kills[0].zkb.awox, false)

  })
})
