const R = require('ramda');
const general = require('./general');
const matches = require('./matches');
const constants = require('../constants');

const pickRadiantPlayers = R.path(['teams', '0', 'players']);
const pickDirePlayers = R.path(['teams', '1', 'players']);

const selectPlayers = match => R.concat(
    pickRadiantPlayers(match),
    pickDirePlayers(match),
);

const mergeByKeyHandler = propName =>
    (p, l, r) => p === propName ? R.mergeWith(R.add, l, r) : r;

const sumStatsAndAssignTotalMatches = games => R.compose(
    R.assoc('matches', R.length(games)),
    R.reduce(R.mergeWithKey(mergeByKeyHandler('player_stats')), {}),
)(games);

const calculateFPForAttribute = (attribute, value) => R.multiply(
    value, R.prop(attribute, constants.FantasyPoints)
);

const calculateFantasyPoints = player => R.compose(
    Math.round,
    R.flip(R.divide)(R.prop('matches', player)),
    R.reduce((score, [k, v]) => R.add(score, calculateFPForAttribute(k, v)), 0),
    R.toPairs,
    R.prop('player_stats'),
)(player);

const calculateAndAssignFPScore = player => R.assoc('averageFP', calculateFantasyPoints(player), player);

const preparePlayerStats = R.compose(
    general.prepareKproperties,
    R.map(general.convertCommaNumberToNumber),
    R.pick(R.keys(constants.FantasyPoints))
);

const convertPlayerStats = R.evolve({ player_stats: preparePlayerStats });

const convertPlayerStatsAcrossAllGames = R.map(convertPlayerStats);

const createPlayersTableFromFaceitRounds = R.compose(
    R.groupBy(R.prop('player_id')),
    R.flatten,
    R.map(selectPlayers),
    matches.selectAllMatches,
);

const calculateTotalPlayerStatistics = R.compose(
    R.map(calculateAndAssignFPScore),
    R.map(sumStatsAndAssignTotalMatches),
    R.map(convertPlayerStatsAcrossAllGames),
    createPlayersTableFromFaceitRounds,
);

module.exports = {
    selectPlayers,
    pickRadiantPlayers,
    pickDirePlayers,
    calculateTotalPlayerStatistics,
};
