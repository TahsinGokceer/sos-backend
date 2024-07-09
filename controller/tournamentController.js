const TournamentModel = require("../model/tournamentModel");
const UserModel = require("../model/userModel");

const FindTournament = async (req, res) => {
    const activeTournaments = await TournamentModel.find({ActiveTournament: true});
    res.status(200).json({activeTournaments})        
}

const CreateTournament = async () => {
    
}

const joinTournament = async(req, res) => {
    const {tournament} = req.body

    const tournamentDB = await TournamentModel.findOne({_id: tournament._id})

    tournamentDB.players = tournament.players
    tournamentDB.ActiveTournament = tournament.ActiveTournament
    await tournamentDB.save()
}


// const CreateTournament = async (req, res) => {
//     // const { tournamentId, userId } = req.body; 

//     try {
        
//         const tournament = await TournamentModel.find({});

//         if (!tournament) {
//             return res.status(404).json({ error: "Tournament not found" });
//         }

//         if (tournament.maxPlayer <= tournament.players.length) {
//             return res.status(400).json({ error: "Tournament has reached maximum player limit" });
//         }

//         /*
//         const user = await UserModel.findOne({ _id: userId });

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
        
//         tournament.players.push(user._id);

//         await tournament.save();
//         */
//         res.status(200).json({ message: "User successfully added to the tournament", tournament });
//     } catch (error) {
//         console.error("Error creating tournament:", error);
        
//         res.status(500).json({ error: "Server error, tournament could not be created" });
//     }
// }

module.exports = { FindTournament, CreateTournament, joinTournament };