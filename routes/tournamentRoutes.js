const router = require("express").Router()
const tournamentController = require("../controller/tournamentController")

router.get("/find", tournamentController.FindTournament)
router.get("/userTournaments/:userId", tournamentController.findUserTournaments)
router.post("/join", tournamentController.joinTournament)


module.exports = router