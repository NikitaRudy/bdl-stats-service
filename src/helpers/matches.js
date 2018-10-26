const R = require('ramda');
const general = require('./general');
const constants = require('../constants');

const isMatchOutOfDate = R.curry(
    (dateInMs, match) => R.compose(R.gte(dateInMs), general.startInMs)(match),
);

const findOutOfDateMatchIndex = dateInMs => R.findIndex(isMatchOutOfDate(dateInMs));

const selectAllMatches = R.compose(
    R.flatten,
    R.pluck('rounds')
);

const filterFinishedMatches = R.filter(
    R.propEq('status', constants.MatchStatuses.FINISHED)
);

module.exports = {
    isMatchOutOfDate,
    findOutOfDateMatchIndex,
    selectAllMatches,
    filterFinishedMatches,
};
