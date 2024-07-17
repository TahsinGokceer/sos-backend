const mongoose = require("mongoose")

const GameSchema = new mongoose.Schema({
    gameLevel: {
        type: String
    },
    result: {
        type: String
    },
    players: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    gameType: {
        type: Boolean
    },
})

const GameModel = mongoose.model("games", GameSchema)
module.exports = GameModel