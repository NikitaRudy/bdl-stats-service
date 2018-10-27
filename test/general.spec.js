const general = require('../src/helpers/general');

describe('#helpers.general', () => {
    describe('#isErrorResponse', () => {
        it('should return true if response contain errors', () => {
            const errResponse = { errors: [{ code: 404, msg: 'not found' }] };
            const response = { items: [{ a: 'whatever'}] }
            expect(general.isErrorResponse(errResponse)).to.be.true;
            expect(general.isErrorResponse(response)).to.be.false;
        });
    });

    describe('#parseJson', () => {
        it('should parse json and return blank object if input is not json', () => {
            const json = '{ "a": 1 }';
            const str = '{ str: str }';

            expect(general.parseJson(json)).to.deep.equal({ a: 1 });
            expect(general.parseJson(str)).to.deep.equal({});
        });
    });

    describe('#startInMs', () => {
        it('should return start in MS', () => {
            const match = { started_at: 1000, duration: 1000 };

            expect(general.startInMs(match)).to.be.equal(match.started_at * 1000);
        });
    });

    describe('#convertKNumber', () => {
        it('should multiply float numbers on 1000', () => {
            expect(general.convertKNumber(1.4)).to.be.equal(1400);
            expect(general.convertKNumber(0.5)).to.be.equal(500);
            expect(general.convertKNumber(10)).to.be.equal(10);
            expect(general.convertKNumber(700)).to.be.equal(700);
        });
    });
});
