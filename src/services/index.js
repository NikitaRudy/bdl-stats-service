const R = require('ramda');
const request = require('request');
const config = require('../config');
const helpers = require('../helpers');
const shared = require('../shared');

const seasonStartDate = Date.parse(config.SEASON_START_DATE);

const requestFaceitData = shared.doRequest(
    config.FACEIT_API_KEY,
    config.FACEIT_API_URL,
    request,
);

const { HUB_ID } = config;

function getHubInfo() {
    return requestFaceitData(`/hubs/${HUB_ID}`);
}

function getHubStats() {
    return requestFaceitData(`/hubs/${HUB_ID}/stats`);
}

function getHubMatches(offset = 0, limit = 100) {
    return requestFaceitData(`/hubs/${HUB_ID}/matches?offset=${offset}&limit=${limit}`);
}

function getMatchStats(match) {
    return requestFaceitData(`/matches/${match}/stats`);
}

async function getHubSeasonMatches(limit = 50) {
    const seasonMatches = [];

    for (let offset = 0; ; offset += limit) {
        const response = await getHubMatches(offset, limit);

        if (helpers.general.isErrorResponse(response)) {
            throw new Error('failed to load faceit data', response);
        }

        const finished = helpers.matches.filterFinishedMatches(response.items);
        const outOfSeasonIndex = helpers.matches.findOutOfDateMatchIndex(seasonStartDate)(finished);

        if (outOfSeasonIndex !== -1) {
            seasonMatches.push(...finished.slice(0, outOfSeasonIndex));
            break;
        } else {
            seasonMatches.push(...finished);
        }
    }
    return seasonMatches;
}

function getHubSeasonMatchesStats(matches) {
    return Promise.all(
        R.compose(
            R.map(getMatchStats),
            R.pluck('match_id'),
        )(matches)
    ).then(helpers.general.filterErrors);
}

module.exports = {
    getHubInfo,
    getHubStats,
    getHubMatches,
    getMatchStats,
    getHubSeasonMatches,
    getHubSeasonMatchesStats,
};
