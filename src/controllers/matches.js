const services = require('../services');
const DetailedMatch = require('../models/DetailedMatch');
const helpers = require('../helpers');

const getSavedMatches = () => DetailedMatch.find().lean();
const getRecentHubMatches = () => services.getHubMatchesAfterDate(
    helpers.date.substractDays(Date.now(), 31 * 7)
);
const getNewHubMatches = async () => {
    return helpers.matches.findMatchesWhichAreNotInDB(
        await getRecentHubMatches(),
        await getSavedMatches(),
    );
};

const saveMatches = matches => DetailedMatch.insertMany(matches);

module.exports = {
    getSavedMatches,
    getRecentHubMatches,
    getNewHubMatches,
    saveMatches,
};
