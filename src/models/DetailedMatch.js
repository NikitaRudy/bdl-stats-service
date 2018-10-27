const mongoose = require('mongoose');

/**
 * "best_of": {},
      "competition_id": {},
      "game_id": {},
      "game_mode": {},
      "match_id": {},
      "match_round": {},
      "played": {},
      "round_stats": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "teams": [
        {
          "players": [
            {
              "nickname": {},
              "player_id": {},
              "player_stats": {
                "additionalProp1": {},
                "additionalProp2": {},
                "additionalProp3": {}
              }
            }
          ],
          "premade": {},
          "team_id": {},
          "team_stats": {
            "additionalProp1": {},
            "additionalProp2": {},
            "additionalProp3": {}
          }
        }
      ]
    }
 */

const DetailedMatchSchema = new mongoose.Schema({
    competition_id: String,
    game_id: String,
    game_mode: String,
    match_id: String,
    match_round: Number,
    played: String,
    round_stats: Object,
    teams: Object,
});

module.exports = mongoose.model('DetailedMatch', DetailedMatchSchema);
