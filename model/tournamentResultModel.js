const mongoose = require("mongoose")

const ResultSchema = new mongoose.Schema({
    // resultID: {
    //     type: Number
    // },
    tournamentID: {
        type: Number
    },
    playerID: {
        type: Number
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