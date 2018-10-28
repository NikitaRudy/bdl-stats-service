require('dotenv').config();

const services = require('../services');
const db = require('../db');
const controllers = require('../controllers');

const mode = process.argv[2];

(async function () {
    try {
        await db.connect();
        console.log('getting new hub matches');
        const newMatches = await (
            mode === 'refresh'
                ? controllers.matches.getNewHubMatches()
                : services.getHubSeasonMatches()
        );

        console.log('getting stats for new matches');
        const newDetailedMatches = await services.getHubMatchesStats(newMatches);

        if (newDetailedMatches.length) {
            console.log(`found ${newDetailedMatches.length} new matches\nsaving new matches in DB`);
            await controllers.matches.saveMatches(newDetailedMatches);

            console.log('calculating players stats');
            await controllers.players.refreshPlayerStats();
        } else {
            console.log('no new matches were found');
        }

        console.log('finished');
        process.exit(0);
    } catch (err) {
        console.log('failed: ', err);
        process.exit(1);
    }
}());
