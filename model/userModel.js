const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    // userID: {
    //     type: Number
    // },
    userName: {
        type: String,
        //unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    percentOfWin: {
        type: Number
    },
    totalGames: {
        type: Number
    },
    gamesWon: {
        type: Number
    },
    gamesLost: {
        type: Number
    },
    gamesDraw: {
        type: Number
    },
    point: {
        type: Number
    },
    games: {
        type: [String]
    },
})

// Kayıt sayfasında kullanıcı şifresinin şifrelenmesi
/*
UserSchema.pre("save", function (next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})
*/


const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel