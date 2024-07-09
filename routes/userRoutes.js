const router = require("express").Router()
const userController = require("../controller/userController")

router.post("/register", userController.SaveUser)
router.post("/login", userController.LoginUser)
router.post("/update", userController.UpdateUser)
router.get("/logout", userController.LogoutUser)
router.get("/getAllUser", userController.displayUser)


module.exports = router