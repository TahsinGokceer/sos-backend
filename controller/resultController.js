const ResultModel = require('../model/tournamentResultModel');

const getUserRankings = async (req, res) => {
    const userId = req.params.userId;

    try {
        const results = await ResultModel.find({ playerID: userId });
        const firstPlace = results.filter(result => result.ranking === 1).length;
        const secondPlace = results.filter(result => result.ranking === 2).length;
        const thirdPlace = results.filter(result => result.ranking === 3).length;

        res.status(200).json({ firstPlace, secondPlace, thirdPlace });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getUserRankings
};