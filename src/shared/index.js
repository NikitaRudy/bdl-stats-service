const R = require('ramda');
const helpers = require('../helpers');

const doRequest = R.curry(
    (apiKey, baseUrl, requestor, path) => new Promise((resolve, reject) => {
        const url = R.concat(baseUrl, path);
        console.log(`requesting ${url}`);
        requestor(
            {
                headers: {
                    Authorization: R.concat('Bearer ', apiKey),
                    accept: 'application/json',
                },
                method: 'GET',
                url,
            },
            (err, resp, body) => R.ifElse(
                () => R.isNil,
                () => R.compose(
                    resolve,
                    helpers.general.parseJson,
                    resp => console.log(`request ${url} resolved. response: ${R.length(resp)}`) || resp,
                )(body),
                () => console.log(`request ${url}} rejected. response: ${err}`) || reject(err),
            )(err),
        );
    })
);

module.exports = {
    doRequest,
};
