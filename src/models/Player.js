const mongoose = require('mongoose');

const Player = new mongoose.Schema({
    player_id: {
        type: String,
        required: true,
    },
    averageFP: Number,
    nickname: String,
    player_stats: Object,
    matches: Number,
    averages: Object,
});

module.exports = mongoose.model('Player', Player);
