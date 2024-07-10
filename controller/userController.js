const UserModel = require("../model/userModel");
const bcrypt = require('bcryptjs');

const SaveUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        const existingUser = await UserModel.findOne({ userName: userName });
        if (existingUser) {
            console.log('This username is already taken.');
            return res.status(200).json({ message: 'This username is already taken.' });
        }
        const existingUserMail = await UserModel.findOne({ email: email });
        if (existingUserMail) {
            return res.status(200).json({ message: 'This email is already exist.' });
        }

        const user = new UserModel({
            userName: userName,
            email: email,
            password: password,
            percentOfWin: 0,
            totalGames: 0,
            gamesWon: 0,
            gamesLost: 0,
            point: 0,
            games: []
        });

        try {
            await user.save();
            res.status(201).json({success: true})
        } catch (err) {
            console.log('Error saving user:', err);
        }
    } catch (error) {
        console.log("------------------------- HATA --------------------------");
        console.log(error);
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;        
        let user = await UserModel.findOne({ userName: email })

        // şifrelenmiş şifreyi karşılaştıran kod
        /*
        bcrypt.compare(password, user.password, (err, same) => {
            if(same){
                res.status(201).json({success: true, user})
            }
        })
        */

        if(user){
            if(user.password === password){
                req.session.userID = user._id
                res.status(201).json({success: true, user})  // Giriş işlemi başarılı
            }else{
                res.status(200).json({ message: 'Wrong Password' });
            }
        }else{
            user = await UserModel.findOne({ email: email })

            if(user){
                if(user.password === password){
                    req.session.userID = user._id
                    res.status(201).json({success: true, user})   // Giriş işlemi başarılı
                }else{
                    res.status(200).json({ message: 'Wrong Password' });    
                }
            }else{
                res.status(200).json({ message: 'Wrong username or email' });
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}

const displayUser = async (req, res) => {
    const allUsers = await UserModel.find({});
    return res.status(200).json({allUsers})        
}

const LogoutUser = async (req, res) => {
    req.session.destroy(() => {
        res.json({message: "Çıkış işlemi başarılı"})
    })
}

const UpdateUser = async(req, res) => {
    const {loginUser} = req.body
    const user = await UserModel.findOne({_id: loginUser._id})

    user.userName = loginUser.userName
    user.email = loginUser.email
    user.password = loginUser.password

    await user.save()
}

module.exports = { SaveUser, LoginUser, displayUser, LogoutUser, UpdateUser }