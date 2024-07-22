const mongoose = require("mongoose")

const ResultSchema = new mongoose.Schema({
    // resultID: {
    //     type: Number
    // },
    tournamentID: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tournament'
    },
    playerID: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User' 
    },
    point: {
        type: Number
    },
    ranking: {
        type: Number
    },
})


const ResultModel = mongoose.model("results", ResultSchema)
module.exports = ResultModel