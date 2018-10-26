const mongoose = require('mongoose');

const DetailedMatchSchema = new mongoose.Schema({
    rounds: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model('DetailedMatch', DetailedMatchSchema);
