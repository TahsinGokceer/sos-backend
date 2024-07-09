const mongoose = require("mongoose")

const TournamentSchema = new mongoose.Schema({
    // tournamentID: {
    //     type: Number
    // },
    maxPlayer: {
        type: Number
    },
    gameID: {
        type: []
    },
    players: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'  // Referans olarak User modeline işaret ediyoruz
    },
    TournamentType: {
        type: String
    },
    ActiveTournament :{
        type: Boolean
    }
})


const TournamentModel = mongoose.model("tournaments", TournamentSchema)
module.exports = TournamentModel