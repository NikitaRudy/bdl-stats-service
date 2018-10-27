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
        console.log('connected to the db');

        const seasonMatches = await services.getHubSeasonMatches();
        console.log('requested season matches');

        const detailedMatches = await services.getHubSeasonMatchesStats(seasonMatches);
        console.log('requested detailed matches');
        await DetailedMatch.insertMany(helpers.matches.selectAllMatches(detailedMatches));

        // const playersTable = helpers.players.calculateTotalPlayerStatistics(detailedMatches);
        // const docs = R.values(playersTable);
        // const q = await Promise.all(
        //     R.map(pl => Player.findOneAndUpdate({ player_id: pl.player_id }, pl, { upsert: true }), docs)
        // );
        // console.log('inserted/updated:', q.length, 'items');

        process.exit(0);
    } catch (err) {
        console.log('failed: ', err);
        process.exit(1);
    }
}());
