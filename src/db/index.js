
const mongoose = require('mongoose');
const util = require('util');

mongoose.Promise = Promise;
const connectToMongo = util.promisify(mongoose.connect.bind(mongoose));

module.exports = {
    connect: () => connectToMongo(process.env.MONGO_URL),
};
