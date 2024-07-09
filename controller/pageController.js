const UserModel = require("../model/userModel")

const sendLoginUser = async (req, res) => {
    const id = req.session.userID
    const loginUser = await UserModel.findOne({_id: id});
    res.status(200).json({loginUser})        
}

module.exports = {sendLoginUser}