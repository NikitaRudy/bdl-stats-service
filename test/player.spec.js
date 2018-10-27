const player = require('../src/helpers/players');

const playerMock = {
    matches: 5,
    player_stats: {
        prop1: 125,
        prop2: 130,
        prop3: 135,
    }
};

describe('#player', () => {
    describe('#calculateAndAssignAverages', () => {
        it('should calculate averages for each property in player_stats', () => {
            const res = player.calculateAndAssignAverages(playerMock);
            expect(res).to.have.property('averages');
            expect(res.averages).to.deep.equal({ prop1: 25, prop2: 26, prop3: 27 });
        });
    });
});
