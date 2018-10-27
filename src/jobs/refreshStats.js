const R = require('ramda');
require('dotenv').config();

const services = require('../services');
const DetailedMatch = require('../models/DetailedMatch');
const Player = require('../models/Player');
const db = require('../db');
const helpers = require('../helpers');

(async function () {
    try {
        await db.connect();
        console.log('getting matches from DB');
        const dbMatches = await DetailedMatch.find().lean();
        console.log('getting recent hub matches');
        const hubMatches = await services.getHubMatchesAfterDate(
            helpers.date.substractDays(Date.now(), 31 * 7)
        );
        const newMatches = helpers.matches.findMatchesWhichAreNotInDB(hubMatches, dbMatches);
        console.log('getting stats for new matches');
        const detailedMatches = helpers.matches.selectAllMatches(await services.getHubSeasonMatchesStats(newMatches));
        console.log('saving new matches into DB');
        const newDetailedMatchDocs = await DetailedMatch.insertMany(detailedMatches);
        const newDetailedMatches = R.concat(dbMatches, detailedMatches);
        console.log('calculating players stats');
        const playersTable = helpers.players.calculateTotalPlayerStatistics(newDetailedMatches);
        console.log('refreshing players stats');
        const playerDocs = await Promise.all(
            R.map(
                pl => Player.findOneAndUpdate(
                    R.pick('player_id', pl), pl, { upsert: true }
                ),
                R.values(playersTable)
            )
        );
        console.log('inserted/updated:', playerDocs.length, 'players');
        process.exit(0);
    } catch (err) {
        console.log('failed: ', err);
        process.exit(1);
    }
}());
