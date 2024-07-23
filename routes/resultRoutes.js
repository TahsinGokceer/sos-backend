const router = require("express").Router()
const resultController = require("../controller/resultController")

router.get('/rankings/:userId', resultController.getUserRankings);

module.exports = router