const R = require('ramda');

const secondsToMs = R.multiply(1000);

const minutesToMs = R.compose(
    secondsToMs,
    R.multiply(60),
);

const hoursInMs = R.compose(
    minutesToMs,
    R.multiply(60),
);

const daysInMs = R.compose(
    hoursInMs,
    R.multiply(24),
);

const createDateSubstracter = converter => R.curry(
    (date, amount) => R.subtract(date, converter(amount))
);

const substractHours = createDateSubstracter(hoursInMs);
const substractDays = createDateSubstracter(daysInMs);

module.exports = {
    substractHours,
    substractDays,
    secondsToMs,
    minutesToMs,
    hoursInMs,
    daysInMs,
};
