const R = require('ramda');
const services = require('../services');
const Player = require('../models/Player');
const helpers = require('../helpers');
const matchControllers = require('./matches');

const getSavedPlayers = () => Player.find().lean();
const saveOrUpdatePlayersStats = playersTable => Promise.all(
    R.map(
        pl => Player.findOneAndUpdate(
            R.pick(['player_id'], pl), pl, { upsert: true }
        ),
        R.values(playersTable)
    )
);

const refreshPlayerStats = async () => {
    return saveOrUpdatePlayersStats(
        R.ifElse(
            arr => arr.length !== 0,
            helpers.players.calculateTotalPlayerStatistics,
            R.always({}),
        )(await matchControllers.getSavedMatches())
    );
};

module.exports = {
    getSavedPlayers,
    saveOrUpdatePlayersStats,
    refreshPlayerStats,
};
