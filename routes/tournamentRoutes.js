const router = require("express").Router()
const tournamentController = require("../controller/tournamentController")

router.get("/find", tournamentController.FindTournament)
router.post("/create", tournamentController.CreateTournament)
router.post("/join", tournamentController.joinTournament)


module.exports = router