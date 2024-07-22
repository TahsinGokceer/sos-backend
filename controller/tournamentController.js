const TournamentModel = require("../model/tournamentModel");
const UserModel = require("../model/userModel");
const ResultModel = require('../model/tournamentResultModel');

const FindTournament = async (req, res) => {
    const activeTournaments = await TournamentModel.find({ActiveTournament: true});
    res.status(200).json({activeTournaments})        
}

const joinTournament = async(req, res) => {
    const {tournament} = req.body

    const tournamentDB = await TournamentModel.findOne({_id: tournament._id})

    tournamentDB.players = tournament.players
    tournamentDB.ActiveTournament = tournament.ActiveTournament
    await tournamentDB.save()
}

const findUserTournaments = async (req, res) => {
    const userId = req.params.userId;

    try {
        const userTournaments = await TournamentModel.find({ players: userId }).lean();

        const tournamentIds = userTournaments.map(tournament => tournament._id);

        const userResults = await ResultModel.find({
            playerID: userId,
            tournamentID: { $in: tournamentIds }
        }).lean();

        const tournamentsWithResults = userTournaments.map(tournament => {
            const result = userResults.find(result => result.tournamentID.toString() === tournament._id.toString());
            return {
                ...tournament,
                ranking: result ? result.ranking : null
            };
        });

        res.status(200).json({ userTournaments: tournamentsWithResults });
    } catch (err) {
        console.error('Error finding user tournaments:', err);
        res.status(500).json({ message: 'Error finding user tournaments', error: err });
    }
};


module.exports = { FindTournament, findUserTournaments , joinTournament };