const router = require("express").Router()
const pageController = require("../controller/pageController")

router.get("/home", pageController.sendLoginUser)

module.exports = router