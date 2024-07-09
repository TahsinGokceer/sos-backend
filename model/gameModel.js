const mongoose = require("mongoose")

const GameSchema = new mongoose.Schema({
    // gameID: {
    //     type: Number
    // },
    gameLevel: {
        type: String
    },
    result: {
        type: String
    },
    winnerUserID: {
        type: Number
    },
    loserUserID: {
        type: Number
    },
    gameType: {
        type: Boolean
    },
})

const GameModel = mongoose.model("games", GameSchema)
module.exports = GameModel