const R = require('ramda');
const constants = require('../constants');

const blankObject = Object.create(null);
const throwErr = err => () => { throw err; };
const secondsToMs = R.multiply(1000);
const isErrorResponse = R.compose(R.complement(R.isNil), R.prop('errors'));
const parseJson = R.tryCatch(JSON.parse, R.always(blankObject));

const startInMs = R.compose(
    secondsToMs,
    R.prop('started_at')
);

const convertToKProp = R.when(Number.isInteger, R.flip(R.divide)(1000));

const prepareKproperties = R.evolve(
    R.map(R.always(convertToKProp), constants.KProps)
);

const convertCommaNumberToNumber = R.compose(
    R.multiply(1),
    R.replace(',', '.'),
);

const filterErrors = R.filter(
    R.propSatisfies(R.isNil, 'errors')
);

module.exports = {
    filterErrors,
    isErrorResponse,
    throwErr,
    startInMs,
    convertCommaNumberToNumber,
    prepareKproperties,
    parseJson,
};
