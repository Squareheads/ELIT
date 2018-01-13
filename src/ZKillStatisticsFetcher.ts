import * as Collections from 'typescript-collections'

export default class ZKillStatisticsFetcher implements IZKillStatisticsFetcher {

  connectionManager: IConnectionManager

  constructor(connectionManager: IConnectionManager) {
    this.connectionManager = connectionManager
  }

  async fetchStatistics(characterIds: number[]): Promise<Collections.Dictionary<number, IZKillStatisticsItem>> {
    return new Promise<Collections.Dictionary<number, IZKillStatisticsItem>>(async (resolve, _reject) => {
      const promises = characterIds.map((characterId: number) => {
        return this.fetchSingleCharacterStatistics(characterId)
      })

      const results = await Promise.all(promises)

      const dictionary = new Collections.Dictionary<number, IZKillStatisticsItem>()

      results.forEach((result: IZKillStatisticsItem) => {
        dictionary.setValue(result.characterId, result)
      })
      resolve(dictionary)
    })
  }

  private async fetchSingleCharacterStatistics(characterId: number): Promise<IZKillStatisticsItem> {
    return new Promise<IZKillStatisticsItem>(async (resolve, _reject) => {

      const URL = 'https://zkillboard.com/api/stats/characterID/' + characterId + '/'
      const data = await this.connectionManager.get(URL)
      const object = JSON.parse(data)

      resolve({
        characterId: characterId,
        dangerRatio: object['dangerRatio'],
        gangRatio: object['gangRatio']
      })
    })
  }
}

/*

{
	"allTimeSum": 261,
	"calcTrophies": false,
	"dangerRatio": 83,
	"gangRatio": 94,
	"groups": {
		"25": {
			"groupID": 25,
			"shipsLost": 7,
			"pointsLost": 72,
			"iskLost": 324239068,
			"shipsDestroyed": 42,
			"pointsDestroyed": 193,
			"iskDestroyed": 2122201546
		},
		"26": {
			"groupID": 26,
			"shipsLost": 1,
			"pointsLost": 1,
			"iskLost": 33027647,
			"shipsDestroyed": 28,
			"pointsDestroyed": 199,
			"iskDestroyed": 778753200
		},
		"27": {
			"groupID": 27,
			"shipsLost": 2,
			"pointsLost": 6,
			"iskLost": 349655282,
			"shipsDestroyed": 30,
			"pointsDestroyed": 352,
			"iskDestroyed": 7153319373
		},
		"29": {
			"groupID": 29,
			"shipsLost": 5,
			"pointsLost": 5,
			"iskLost": 1274927,
			"shipsDestroyed": 29,
			"pointsDestroyed": 29,
			"iskDestroyed": 975158379
		},
		"324": {
			"groupID": 324,
			"shipsLost": 2,
			"pointsLost": 12,
			"iskLost": 79729833,
			"shipsDestroyed": 13,
			"pointsDestroyed": 37,
			"iskDestroyed": 870776632
		},
		"358": {
			"groupID": 358,
			"shipsLost": 1,
			"pointsLost": 3,
			"iskLost": 183811158,
			"shipsDestroyed": 6,
			"pointsDestroyed": 19,
			"iskDestroyed": 1122913202
		},
		"419": {
			"groupID": 419,
			"shipsLost": 2,
			"pointsLost": 26,
			"iskLost": 182025174,
			"shipsDestroyed": 56,
			"pointsDestroyed": 141,
			"iskDestroyed": 4793117816
		},
		"420": {
			"groupID": 420,
			"shipsLost": 4,
			"pointsLost": 15,
			"iskLost": 65272490,
			"shipsDestroyed": 9,
			"pointsDestroyed": 69,
			"iskDestroyed": 65694355
		},
		"831": {
			"groupID": 831,
			"shipsLost": 6,
			"pointsLost": 38,
			"iskLost": 177837522,
			"shipsDestroyed": 9,
			"pointsDestroyed": 46,
			"iskDestroyed": 384829324
		},
		"833": {
			"groupID": 833,
			"shipsLost": 2,
			"pointsLost": 28,
			"iskLost": 412129745,
			"shipsDestroyed": 2,
			"pointsDestroyed": 2,
			"iskDestroyed": 397414059
		},
		"834": {
			"groupID": 834,
			"shipsLost": 3,
			"pointsLost": 47,
			"iskLost": 131862433,
			"shipsDestroyed": 4,
			"pointsDestroyed": 16,
			"iskDestroyed": 190103809
		},
		"894": {
			"groupID": 894,
			"shipsLost": 1,
			"pointsLost": 1,
			"iskLost": 246849961,
			"shipsDestroyed": 1,
			"pointsDestroyed": 1,
			"iskDestroyed": 275442261
		},
		"28": {
			"groupID": 28,
			"shipsDestroyed": 3,
			"pointsDestroyed": 23,
			"iskDestroyed": 22570679
		},
		"31": {
			"groupID": 31,
			"shipsDestroyed": 2,
			"pointsDestroyed": 2,
			"iskDestroyed": 30019291
		},
		"237": {
			"groupID": 237,
			"shipsDestroyed": 6,
			"pointsDestroyed": 6,
			"iskDestroyed": 164020
		},
		"463": {
			"groupID": 463,
			"shipsDestroyed": 1,
			"pointsDestroyed": 2,
			"iskDestroyed": 27131828
		},
		"540": {
			"groupID": 540,
			"shipsDestroyed": 1,
			"pointsDestroyed": 6,
			"iskDestroyed": 329728115
		},
		"541": {
			"groupID": 541,
			"shipsDestroyed": 5,
			"pointsDestroyed": 34,
			"iskDestroyed": 277456666
		},
		"547": {
			"groupID": 547,
			"shipsDestroyed": 2,
			"pointsDestroyed": 3,
			"iskDestroyed": 4066578237
		},
		"893": {
			"groupID": 893,
			"shipsDestroyed": 2,
			"pointsDestroyed": 6,
			"iskDestroyed": 368607071
		},
		"906": {
			"groupID": 906,
			"shipsDestroyed": 1,
			"pointsDestroyed": 1,
			"iskDestroyed": 187066198
		},
		"963": {
			"groupID": 963,
			"shipsDestroyed": 1,
			"pointsDestroyed": 1,
			"iskDestroyed": 422117896
		},
		"1025": {
			"groupID": 1025,
			"shipsDestroyed": 7,
			"pointsDestroyed": 7,
			"iskDestroyed": 1179545256
		},
		"543": {
			"groupID": 543,
			"shipsDestroyed": 1,
			"pointsDestroyed": 1,
			"iskDestroyed": 205479990
		}
	},
	"id": 580797163,
	"iskDestroyed": 26246189212,
	"iskLost": 2187715245,
	"months": {
		"200806": {
			"year": 2008,
			"month": 6,
			"shipsLost": 2,
			"pointsLost": 18,
			"iskLost": 32763818,
			"shipsDestroyed": 11,
			"pointsDestroyed": 18,
			"iskDestroyed": 679604895
		},
		"200807": {
			"year": 2008,
			"month": 7,
			"shipsLost": 3,
			"pointsLost": 3,
			"iskLost": 207718651,
			"shipsDestroyed": 12,
			"pointsDestroyed": 79,
			"iskDestroyed": 1020853283
		},
		"200808": {
			"year": 2008,
			"month": 8,
			"shipsLost": 1,
			"pointsLost": 23,
			"iskLost": 7742383,
			"shipsDestroyed": 18,
			"pointsDestroyed": 30,
			"iskDestroyed": 3265201246
		},
		"200809": {
			"year": 2008,
			"month": 9,
			"shipsLost": 3,
			"pointsLost": 22,
			"iskLost": 242227358
		},
		"200901": {
			"year": 2009,
			"month": 1,
			"shipsLost": 1,
			"pointsLost": 6,
			"iskLost": 27265552,
			"shipsDestroyed": 9,
			"pointsDestroyed": 39,
			"iskDestroyed": 497840099
		},
		"200902": {
			"year": 2009,
			"month": 2,
			"shipsLost": 3,
			"pointsLost": 5,
			"iskLost": 237784565,
			"shipsDestroyed": 22,
			"pointsDestroyed": 129,
			"iskDestroyed": 775006655
		},
		"201003": {
			"year": 2010,
			"month": 3,
			"shipsLost": 1,
			"pointsLost": 9,
			"iskLost": 29519376,
			"shipsDestroyed": 9,
			"pointsDestroyed": 32,
			"iskDestroyed": 422706401
		},
		"201004": {
			"year": 2010,
			"month": 4,
			"shipsLost": 7,
			"pointsLost": 43,
			"iskLost": 519231328,
			"shipsDestroyed": 39,
			"pointsDestroyed": 137,
			"iskDestroyed": 4835501911
		},
		"201005": {
			"year": 2010,
			"month": 5,
			"shipsLost": 1,
			"pointsLost": 1,
			"iskLost": 246849961,
			"shipsDestroyed": 16,
			"pointsDestroyed": 93,
			"iskDestroyed": 1139879289
		},
		"201006": {
			"year": 2010,
			"month": 6,
			"shipsLost": 1,
			"pointsLost": 14,
			"iskLost": 97817531
		},
		"201108": {
			"year": 2011,
			"month": 8,
			"shipsLost": 2,
			"pointsLost": 3,
			"iskLost": 20565365,
			"shipsDestroyed": 2,
			"pointsDestroyed": 7,
			"iskDestroyed": 593577068
		},
		"201109": {
			"year": 2011,
			"month": 9,
			"shipsLost": 2,
			"pointsLost": 8,
			"iskLost": 183752937,
			"shipsDestroyed": 6,
			"pointsDestroyed": 21,
			"iskDestroyed": 274671152
		},
		"201110": {
			"year": 2011,
			"month": 10,
			"shipsLost": 2,
			"pointsLost": 13,
			"iskLost": 88110071,
			"shipsDestroyed": 40,
			"pointsDestroyed": 132,
			"iskDestroyed": 4139068408
		},
		"201208": {
			"year": 2012,
			"month": 8,
			"shipsLost": 3,
			"pointsLost": 42,
			"iskLost": 133294327
		},
		"201412": {
			"year": 2014,
			"month": 12,
			"shipsLost": 1,
			"pointsLost": 5,
			"iskLost": 28983214,
			"shipsDestroyed": 17,
			"pointsDestroyed": 61,
			"iskDestroyed": 1629699503
		},
		"201712": {
			"year": 2017,
			"month": 12,
			"shipsLost": 2,
			"pointsLost": 14,
			"iskLost": 56629317,
			"shipsDestroyed": 13,
			"pointsDestroyed": 18,
			"iskDestroyed": 1387720550
		},
		"200811": {
			"year": 2008,
			"month": 11,
			"shipsDestroyed": 5,
			"pointsDestroyed": 6,
			"iskDestroyed": 159848585
		},
		"200907": {
			"year": 2009,
			"month": 7,
			"shipsDestroyed": 5,
			"pointsDestroyed": 35,
			"iskDestroyed": 841538951
		},
		"201001": {
			"year": 2010,
			"month": 1,
			"shipsDestroyed": 10,
			"pointsDestroyed": 237,
			"iskDestroyed": 1424986843
		},
		"201106": {
			"year": 2011,
			"month": 6,
			"shipsDestroyed": 2,
			"pointsDestroyed": 25,
			"iskDestroyed": 95951414
		},
		"201111": {
			"year": 2011,
			"month": 11,
			"shipsDestroyed": 13,
			"pointsDestroyed": 17,
			"iskDestroyed": 2719529606
		},
		"201711": {
			"year": 2017,
			"month": 11,
			"shipsDestroyed": 4,
			"pointsDestroyed": 32,
			"iskDestroyed": 33275315
		},
		"201801": {
			"year": 2018,
			"month": 1,
			"shipsLost": 1,
			"pointsLost": 25,
			"iskLost": 27459484,
			"shipsDestroyed": 4,
			"pointsDestroyed": 24,
			"iskDestroyed": 32535089
		},
		"200802": {
			"year": 2008,
			"month": 2,
			"shipsDestroyed": 1,
			"pointsDestroyed": 1,
			"iskDestroyed": 61698083
		},
		"200801": {
			"year": 2008,
			"month": 1,
			"shipsDestroyed": 2,
			"pointsDestroyed": 22,
			"iskDestroyed": 215484855
		},
		"200712": {
			"year": 2007,
			"month": 12,
			"shipsDestroyed": 1,
			"pointsDestroyed": 1,
			"iskDestroyed": 10000
		}
	},
	"nextTopRecalc": 263,
	"pointsDestroyed": 1196,
	"pointsLost": 254,
	"sequence": 45782998,
	"shipsDestroyed": 261,
	"shipsLost": 36,
	"soloKills": 18,
	"soloLosses": 12,
	"topAllTime": [{
		"type": "character",
		"data": [{
			"kills": 261,
			"characterID": 580797163,
			"characterName": "Kellyl"
		}]
	}, {
		"type": "corporation",
		"data": [{
			"kills": 121,
			"corporationID": 1616074553,
			"corporationName": "Integrity.",
			"cticker": "INTGY"
		}, {
			"kills": 69,
			"corporationID": 1123999001,
			"corporationName": "Terminal Impact",
			"cticker": "TICT"
		}, {
			"kills": 34,
			"corporationID": 866000369,
			"corporationName": "Spiritus Draconis",
			"cticker": "SP-DR"
		}, {
			"kills": 17,
			"corporationID": 98181740,
			"corporationName": "Anatidae Rising",
			"cticker": "DUCK1"
		}, {
			"kills": 11,
			"corporationID": 1677466418,
			"corporationName": "The Reality Dysfunction",
			"cticker": "-TRD-"
		}, {
			"kills": 5,
			"corporationID": 1000107,
			"corporationName": "The Scope",
			"cticker": "TS"
		}, {
			"kills": 4,
			"corporationID": 1827125796,
			"corporationName": "Free Traders",
			"cticker": "TRDRS"
		}]
	}, {
		"type": "alliance",
		"data": [{
			"kills": 58,
			"allianceID": 1182801433,
			"allianceName": "On the Rocks",
			"aticker": "ICE"
		}, {
			"kills": 17,
			"allianceID": 99004397,
			"allianceName": "FEARLESS.",
			"aticker": "HLMAR"
		}, {
			"kills": 11,
			"allianceID": 583103382,
			"allianceName": "Kairakau",
			"aticker": "-RAK-"
		}, {
			"kills": 5,
			"allianceID": 166924340,
			"allianceName": "Apoapsis Multiversal Consortium",
			"aticker": "AMC"
		}, {
			"kills": 4,
			"allianceID": 1243657099,
			"allianceName": "Free Trade Syndicate",
			"aticker": "FREE."
		}]
	}, {
		"type": "faction",
		"data": [{
			"kills": 138,
			"factionID": 500004,
			"factionName": "Gallente Federation"
		}]
	}, {
		"type": "ship",
		"data": [{
			"kills": 32,
			"shipTypeID": 11963,
			"shipName": "Rapier",
			"groupID": "833",
			"groupName": "Force Recon Ship"
		}, {
			"kills": 23,
			"shipTypeID": 11184,
			"shipName": "Crusader",
			"groupID": "831",
			"groupName": "Interceptor"
		}, {
			"kills": 14,
			"shipTypeID": 16229,
			"shipName": "Brutix",
			"groupID": "419",
			"groupName": "Combat Battlecruiser"
		}, {
			"kills": 14,
			"shipTypeID": 17841,
			"shipName": "Federation Navy Comet",
			"groupID": "25",
			"groupName": "Frigate"
		}, {
			"kills": 13,
			"shipTypeID": 16242,
			"shipName": "Thrasher",
			"groupID": "420",
			"groupName": "Destroyer"
		}, {
			"kills": 12,
			"shipTypeID": 24702,
			"shipName": "Hurricane",
			"groupID": "419",
			"groupName": "Combat Battlecruiser"
		}, {
			"kills": 11,
			"shipTypeID": 11965,
			"shipName": "Pilgrim",
			"groupID": "833",
			"groupName": "Force Recon Ship"
		}, {
			"kills": 11,
			"shipTypeID": 24692,
			"shipName": "Abaddon",
			"groupID": "27",
			"groupName": "Battleship"
		}, {
			"kills": 10,
			"shipTypeID": 12003,
			"shipName": "Zealot",
			"groupID": "358",
			"groupName": "Heavy Assault Cruiser"
		}, {
			"kills": 9,
			"shipTypeID": 627,
			"shipName": "Thorax",
			"groupID": "26",
			"groupName": "Cruiser"
		}, {
			"kills": 8,
			"shipTypeID": 603,
			"shipName": "Merlin",
			"groupID": "25",
			"groupName": "Frigate"
		}, {
			"kills": 7,
			"shipTypeID": 11387,
			"shipName": "Hyena",
			"groupID": "893",
			"groupName": "Electronic Attack Ship"
		}, {
			"kills": 7,
			"shipTypeID": 11400,
			"shipName": "Jaguar",
			"groupID": "324",
			"groupName": "Assault Frigate"
		}, {
			"kills": 6,
			"shipTypeID": 622,
			"shipName": "Stabber",
			"groupID": "26",
			"groupName": "Cruiser"
		}, {
			"kills": 6,
			"shipTypeID": 629,
			"shipName": "Rupture",
			"groupID": "26",
			"groupName": "Cruiser"
		}, {
			"kills": 6,
			"shipTypeID": 11202,
			"shipName": "Ares",
			"groupID": "831",
			"groupName": "Interceptor"
		}, {
			"kills": 5,
			"shipTypeID": 594,
			"shipName": "Incursus",
			"groupID": "25",
			"groupName": "Frigate"
		}, {
			"kills": 5,
			"shipTypeID": 645,
			"shipName": "Dominix",
			"groupID": "27",
			"groupName": "Battleship"
		}, {
			"kills": 5,
			"shipTypeID": 11198,
			"shipName": "Stiletto",
			"groupID": "831",
			"groupName": "Interceptor"
		}, {
			"kills": 4,
			"shipTypeID": 24698,
			"shipName": "Drake",
			"groupID": "419",
			"groupName": "Combat Battlecruiser"
		}, {
			"kills": 4,
			"shipTypeID": 32872,
			"shipName": "Algos",
			"groupID": "420",
			"groupName": "Destroyer"
		}, {
			"kills": 4,
			"shipTypeID": 12013,
			"shipName": "Broadsword",
			"groupID": "894",
			"groupName": "Heavy Interdiction Cruiser"
		}, {
			"kills": 3,
			"shipTypeID": 670,
			"shipName": "Capsule",
			"groupID": "29",
			"groupName": "Capsule"
		}, {
			"kills": 3,
			"shipTypeID": 12023,
			"shipName": "Deimos",
			"groupID": "358",
			"groupName": "Heavy Assault Cruiser"
		}, {
			"kills": 3,
			"shipTypeID": 11377,
			"shipName": "Nemesis",
			"groupID": "834",
			"groupName": "Stealth Bomber"
		}, {
			"kills": 2,
			"shipTypeID": 12038,
			"shipName": "Purifier",
			"groupID": "834",
			"groupName": "Stealth Bomber"
		}, {
			"kills": 2,
			"shipTypeID": 11957,
			"shipName": "Falcon",
			"groupID": "833",
			"groupName": "Force Recon Ship"
		}, {
			"kills": 2,
			"shipTypeID": 641,
			"shipName": "Megathron",
			"groupID": "27",
			"groupName": "Battleship"
		}, {
			"kills": 2,
			"shipTypeID": 16236,
			"shipName": "Coercer",
			"groupID": "420",
			"groupName": "Destroyer"
		}, {
			"kills": 2,
			"shipTypeID": 587,
			"shipName": "Rifter",
			"groupID": "25",
			"groupName": "Frigate"
		}, {
			"kills": 2,
			"shipTypeID": 24696,
			"shipName": "Harbinger",
			"groupID": "419",
			"groupName": "Combat Battlecruiser"
		}, {
			"kills": 2,
			"shipTypeID": 11371,
			"shipName": "Wolf",
			"groupID": "324",
			"groupName": "Assault Frigate"
		}, {
			"kills": 2,
			"shipTypeID": 12042,
			"shipName": "Ishkur",
			"groupID": "324",
			"groupName": "Assault Frigate"
		}, {
			"kills": 2,
			"shipTypeID": 17930,
			"shipName": "Worm",
			"groupID": "25",
			"groupName": "Frigate"
		}, {
			"kills": 2,
			"shipTypeID": 11200,
			"shipName": "Taranis",
			"groupID": "831",
			"groupName": "Interceptor"
		}, {
			"kills": 1,
			"shipTypeID": 11987,
			"shipName": "Guardian",
			"groupID": "832",
			"groupName": "Logistics"
		}, {
			"kills": 1,
			"shipTypeID": 17703,
			"shipName": "Imperial Navy Slicer",
			"groupID": "25",
			"groupName": "Frigate"
		}, {
			"kills": 1,
			"shipTypeID": 12034,
			"shipName": "Hound",
			"groupID": "834",
			"groupName": "Stealth Bomber"
		}, {
			"kills": 1,
			"shipTypeID": 626,
			"shipName": "Vexor",
			"groupID": "26",
			"groupName": "Cruiser"
		}]
	}, {
		"type": "system",
		"data": [{
			"kills": 43,
			"solarSystemID": 30000250,
			"solarSystemName": "P3EN-E",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-0.3",
			"systemColorCode": "#F30202",
			"regionID": 10000003,
			"regionName": "Vale of the Silent"
		}, {
			"kills": 23,
			"solarSystemID": 30005000,
			"solarSystemName": "Old Man Star",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000064,
			"regionName": "Essence"
		}, {
			"kills": 20,
			"solarSystemID": 30002813,
			"solarSystemName": "Tama",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000033,
			"regionName": "The Citadel"
		}, {
			"kills": 15,
			"solarSystemID": 30045339,
			"solarSystemName": "Enaluri",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}, {
			"kills": 13,
			"solarSystemID": 30004984,
			"solarSystemName": "Abune",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000064,
			"regionName": "Essence"
		}, {
			"kills": 12,
			"solarSystemID": 30045347,
			"solarSystemName": "Oinasiken",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.2",
			"systemColorCode": "#EB4903",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}, {
			"kills": 11,
			"solarSystemID": 30045353,
			"solarSystemName": "Pynekastoh",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.2",
			"systemColorCode": "#EB4903",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}, {
			"kills": 10,
			"solarSystemID": 30004979,
			"solarSystemName": "Heydieles",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000064,
			"regionName": "Essence"
		}, {
			"kills": 9,
			"solarSystemID": 30045352,
			"solarSystemName": "Nisuwa",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}, {
			"kills": 7,
			"solarSystemID": 30002655,
			"solarSystemName": "Vylade",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.8",
			"systemColorCode": "#02F34B",
			"regionID": 10000032,
			"regionName": "Sinq Laison"
		}, {
			"kills": 5,
			"solarSystemID": 30002809,
			"solarSystemName": "Sujarento",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000033,
			"regionName": "The Citadel"
		}, {
			"kills": 5,
			"solarSystemID": 30001245,
			"solarSystemName": "BUZ-DB",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-0.5",
			"systemColorCode": "#F30202",
			"regionID": 10000014,
			"regionName": "Catch"
		}, {
			"kills": 5,
			"solarSystemID": 30003838,
			"solarSystemName": "Oicx",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000048,
			"regionName": "Placid"
		}, {
			"kills": 5,
			"solarSystemID": 30000205,
			"solarSystemName": "Obe",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000002,
			"regionName": "The Forge"
		}, {
			"kills": 5,
			"solarSystemID": 30003836,
			"solarSystemName": "Vlillirier",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000048,
			"regionName": "Placid"
		}, {
			"kills": 5,
			"solarSystemID": 30000252,
			"solarSystemName": "IPAY-2",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-0.3",
			"systemColorCode": "#F30202",
			"regionID": 10000003,
			"regionName": "Vale of the Silent"
		}, {
			"kills": 5,
			"solarSystemID": 31000479,
			"solarSystemName": "J100246",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-1.0",
			"systemColorCode": "#F30202",
			"regionID": 11000005,
			"regionName": "B-R00005",
			"systemClass": "2",
			"systemEffect": null
		}, {
			"kills": 5,
			"solarSystemID": 30045338,
			"solarSystemName": "Hikkoken",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}, {
			"kills": 3,
			"solarSystemID": 30004663,
			"solarSystemName": "LBGI-2",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-0.9",
			"systemColorCode": "#F30202",
			"regionID": 10000058,
			"regionName": "Fountain"
		}, {
			"kills": 3,
			"solarSystemID": 30045344,
			"solarSystemName": "Nennamaila",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}, {
			"kills": 3,
			"solarSystemID": 31000372,
			"solarSystemName": "J144605",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-1.0",
			"systemColorCode": "#F30202",
			"regionID": 11000004,
			"regionName": "B-R00004",
			"systemClass": "2",
			"systemEffect": null
		}, {
			"kills": 2,
			"solarSystemID": 30004970,
			"solarSystemName": "Renyn",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.9",
			"systemColorCode": "#4BF3C3",
			"regionID": 10000064,
			"regionName": "Essence"
		}, {
			"kills": 2,
			"solarSystemID": 30045319,
			"solarSystemName": "Eha",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}, {
			"kills": 2,
			"solarSystemID": 30002812,
			"solarSystemName": "Tannolen",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000033,
			"regionName": "The Citadel"
		}, {
			"kills": 2,
			"solarSystemID": 30003827,
			"solarSystemName": "Aubenall",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000048,
			"regionName": "Placid"
		}, {
			"kills": 2,
			"solarSystemID": 31000982,
			"solarSystemName": "J125938",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-1.0",
			"systemColorCode": "#F30202",
			"regionID": 11000010,
			"regionName": "C-R00010",
			"systemClass": "3",
			"systemEffect": null
		}, {
			"kills": 2,
			"solarSystemID": 30003830,
			"solarSystemName": "Orvolle",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.7",
			"systemColorCode": "#00FF00",
			"regionID": 10000048,
			"regionName": "Placid"
		}, {
			"kills": 2,
			"solarSystemID": 30004658,
			"solarSystemName": "ZUE-NS",
			"sunTypeID": 3802,
			"solarSystemSecurity": "-0.3",
			"systemColorCode": "#F30202",
			"regionID": 10000058,
			"regionName": "Fountain"
		}, {
			"kills": 2,
			"solarSystemID": 30003854,
			"solarSystemName": "Alamel",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.2",
			"systemColorCode": "#EB4903",
			"regionID": 10000048,
			"regionName": "Placid"
		}, {
			"kills": 2,
			"solarSystemID": 30001199,
			"solarSystemName": "3-OKDA",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-0.2",
			"systemColorCode": "#F30202",
			"regionID": 10000014,
			"regionName": "Catch"
		}, {
			"kills": 2,
			"solarSystemID": 30004980,
			"solarSystemName": "Fliet",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000064,
			"regionName": "Essence"
		}, {
			"kills": 2,
			"solarSystemID": 30002659,
			"solarSystemName": "Dodixie",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.9",
			"systemColorCode": "#4BF3C3",
			"regionID": 10000032,
			"regionName": "Sinq Laison"
		}, {
			"kills": 2,
			"solarSystemID": 30045349,
			"solarSystemName": "Rakapas",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.2",
			"systemColorCode": "#EB4903",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}, {
			"kills": 1,
			"solarSystemID": 30002783,
			"solarSystemName": "Sankkasen",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.7",
			"systemColorCode": "#00FF00",
			"regionID": 10000033,
			"regionName": "The Citadel"
		}, {
			"kills": 1,
			"solarSystemID": 30002537,
			"solarSystemName": "Amamake",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000030,
			"regionName": "Heimatar"
		}, {
			"kills": 1,
			"solarSystemID": 30003828,
			"solarSystemName": "Moclinamaud",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000048,
			"regionName": "Placid"
		}, {
			"kills": 1,
			"solarSystemID": 30000265,
			"solarSystemName": "AZBR-2",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-0.7",
			"systemColorCode": "#F30202",
			"regionID": 10000003,
			"regionName": "Vale of the Silent"
		}, {
			"kills": 1,
			"solarSystemID": 30003068,
			"solarSystemName": "Kourmonen",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000038,
			"regionName": "The Bleak Lands"
		}, {
			"kills": 1,
			"solarSystemID": 30002693,
			"solarSystemName": "Egghelende",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000032,
			"regionName": "Sinq Laison"
		}, {
			"kills": 1,
			"solarSystemID": 30003022,
			"solarSystemName": "Mya",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000037,
			"regionName": "Everyshore"
		}, {
			"kills": 1,
			"solarSystemID": 30004985,
			"solarSystemName": "Deven",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000064,
			"regionName": "Essence"
		}, {
			"kills": 1,
			"solarSystemID": 30000256,
			"solarSystemName": "Q-L07F",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-0.3",
			"systemColorCode": "#F30202",
			"regionID": 10000003,
			"regionName": "Vale of the Silent"
		}, {
			"kills": 1,
			"solarSystemID": 30004811,
			"solarSystemName": "4-P4FE",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-0.3",
			"systemColorCode": "#F30202",
			"regionID": 10000061,
			"regionName": "Tenerifis"
		}, {
			"kills": 1,
			"solarSystemID": 30003584,
			"solarSystemName": "Sarline",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000044,
			"regionName": "Solitude"
		}, {
			"kills": 1,
			"solarSystemID": 30014971,
			"solarSystemName": "Couster",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.9",
			"systemColorCode": "#4BF3C3",
			"regionID": 10000064,
			"regionName": "Essence"
		}, {
			"kills": 1,
			"solarSystemID": 30045330,
			"solarSystemName": "Okkamon",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}, {
			"kills": 1,
			"solarSystemID": 30003795,
			"solarSystemName": "Covryn",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000048,
			"regionName": "Placid"
		}, {
			"kills": 1,
			"solarSystemID": 30004736,
			"solarSystemName": "4X0-8B",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-0.2",
			"systemColorCode": "#F30202",
			"regionID": 10000060,
			"regionName": "Delve"
		}, {
			"kills": 1,
			"solarSystemID": 30000249,
			"solarSystemName": "EIDI-N",
			"sunTypeID": "3802",
			"solarSystemSecurity": "-0.4",
			"systemColorCode": "#F30202",
			"regionID": 10000003,
			"regionName": "Vale of the Silent"
		}, {
			"kills": 1,
			"solarSystemID": 30002807,
			"solarSystemName": "Nagamanen",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000033,
			"regionName": "The Citadel"
		}, {
			"kills": 1,
			"solarSystemID": 30003837,
			"solarSystemName": "Aldranette",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000048,
			"regionName": "Placid"
		}, {
			"kills": 1,
			"solarSystemID": 30003587,
			"solarSystemName": "Harner",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.1",
			"systemColorCode": "#DC3201",
			"regionID": 10000044,
			"regionName": "Solitude"
		}, {
			"kills": 1,
			"solarSystemID": 30004999,
			"solarSystemName": "Ladistier",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000064,
			"regionName": "Essence"
		}, {
			"kills": 1,
			"solarSystemID": 30045346,
			"solarSystemName": "Kedama",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}, {
			"kills": 1,
			"solarSystemID": 30003580,
			"solarSystemName": "Niballe",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.6",
			"systemColorCode": "#96F933",
			"regionID": 10000044,
			"regionName": "Solitude"
		}, {
			"kills": 1,
			"solarSystemID": 30005296,
			"solarSystemName": "Melmaniel",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000068,
			"regionName": "Verge Vendor"
		}, {
			"kills": 1,
			"solarSystemID": 30045314,
			"solarSystemName": "Kinakka",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}, {
			"kills": 1,
			"solarSystemID": 30045342,
			"solarSystemName": "Akidagi",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.4",
			"systemColorCode": "#E58000",
			"regionID": 10000069,
			"regionName": "Black Rise"
		}]
	}],
	"trophies": {
		"levels": 86,
		"max": 500
	},
	"type": "characterID",
	"activepvp": {
		"ships": {
			"type": "Ships",
			"count": 2
		},
		"systems": {
			"type": "Systems",
			"count": 4
		},
		"regions": {
			"type": "Regions",
			"count": 2
		},
		"kills": {
			"type": "Total Kills",
			"count": 5
		}
	},
	"info": {
		"allianceID": 0,
		"corporationID": 1616074553,
		"factionID": 0,
		"id": 580797163,
		"killID": 43512362,
		"lastApiUpdate": {
			"sec": 1515335562,
			"usec": 0
		},
		"name": "Kellyl",
		"secStatus": -0.45720916528236,
		"skip": 2,
		"type": "characterID"
	},
	"topLists": [{
		"type": "character",
		"title": "Top Characters",
		"values": [{
			"kills": 4,
			"characterID": 580797163,
			"characterName": "Kellyl",
			"id": 580797163,
			"typeID": null,
			"name": "Kellyl"
		}]
	}, {
		"type": "corporation",
		"title": "Top Corporations",
		"values": [{
			"kills": 4,
			"corporationID": 1616074553,
			"corporationName": "Integrity.",
			"cticker": "INTGY",
			"id": 1616074553,
			"typeID": null,
			"name": "Integrity."
		}]
	}, {
		"type": "alliance",
		"title": "Top Alliances",
		"values": []
	}, {
		"type": "shipType",
		"title": "Top Ships",
		"values": [{
			"kills": 4,
			"shipTypeID": 17841,
			"shipName": "Federation Navy Comet",
			"groupID": "25",
			"groupName": "Frigate",
			"id": 17841,
			"typeID": null,
			"name": "Federation Navy Comet"
		}]
	}, {
		"type": "solarSystem",
		"title": "Top Systems",
		"values": [{
			"kills": 2,
			"solarSystemID": 30045344,
			"solarSystemName": "Nennamaila",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000069,
			"regionName": "Black Rise",
			"id": 30045344,
			"typeID": null,
			"name": "Nennamaila"
		}, {
			"kills": 1,
			"solarSystemID": 30045347,
			"solarSystemName": "Oinasiken",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.2",
			"systemColorCode": "#EB4903",
			"regionID": 10000069,
			"regionName": "Black Rise",
			"id": 30045347,
			"typeID": null,
			"name": "Oinasiken"
		}, {
			"kills": 1,
			"solarSystemID": 30045346,
			"solarSystemName": "Kedama",
			"sunTypeID": "3802",
			"solarSystemSecurity": "0.3",
			"systemColorCode": "#F66301",
			"regionID": 10000069,
			"regionName": "Black Rise",
			"id": 30045346,
			"typeID": null,
			"name": "Kedama"
		}]
	}, {
		"type": "location",
		"title": "Top Locations",
		"values": [{
			"kills": 2,
			"locationID": 40349770,
			"itemName": "Nennamaila - Star",
			"locationName": "Nennamaila - Star",
			"typeID": "3796",
			"id": 40349770,
			"name": "Nennamaila - Star"
		}, {
			"kills": 1,
			"locationID": 40349908,
			"itemName": "Kedama IV - Moon 14",
			"locationName": "Kedama IV - Moon 14",
			"typeID": "14",
			"id": 40349908,
			"name": "Kedama IV - Moon 14"
		}, {
			"kills": 1,
			"locationID": 40349976,
			"itemName": "Oinasiken III - Moon 1",
			"locationName": "Oinasiken III - Moon 1",
			"typeID": "14",
			"id": 40349976,
			"name": "Oinasiken III - Moon 1"
		}]
	}],
	"topIskKillIDs": [67087864, 67115716, 67074143, 67087885]
}

*/
