const R = require('ramda');
const constants = require('../constants');
const date = require('./date');

const blankObject = Object.create(null);
const throwErr = err => () => { throw err; };

const isErrorResponse = R.compose(R.complement(R.isNil), R.prop('errors'));
const parseJson = R.tryCatch(JSON.parse, R.always(blankObject));

const withLogs = (logfn, fn) => (...args) => fn(...args).then(v => logfn(v) || v);

const startInMs = R.compose(
    date.secondsToMs,
    R.prop('started_at')
);

const convertKNumber = R.when(
    R.complement(Number.isInteger),
    R.multiply(1000)
);

const prepareKProperties = R.evolve(
    R.map(
        R.always(convertKNumber),
        constants.KProps,
    )
);

const convertCommaNumberToNumber = R.compose(
    R.multiply(1),
    R.replace(',', '.'),
);

const filterErrors = R.filter(
    R.propSatisfies(R.isNil, 'errors')
);

module.exports = {
    throwErr,
    isErrorResponse,
    parseJson,
    startInMs,
    convertKNumber,
    prepareKProperties,
    convertCommaNumberToNumber,
    filterErrors,
    withLogs,
};
