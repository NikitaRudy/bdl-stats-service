const matches = require('../src/helpers/matches');

describe('#matches', () => {
    describe('#findMatchesWhichAreNotInDB', () => {
        it('should find matches which are not in DB', () => {
            const dbData = Array.from({ length: 10 }, (v, k) => ({ match_id: k }));
            const matchesData = [{ match_id: 8 }, { match_id: 9 }, { match_id: 10 }, { match_id: 11 }];
            const exptected = matchesData.slice(2);

            expect(matches.findMatchesWhichAreNotInDB(matchesData, dbData)).to.deep.equal(exptected);
        });
    });
});
