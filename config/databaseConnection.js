const mongoose = require("mongoose")

async function connectDatabase() {
    try {
        await mongoose.connect("mongodb+srv://tgokceer:X3V35570@cluster0.plwkuyo.mongodb.net/sos")
        
    } catch (error) {
        console.log("------------------------------------ HATA ---------------------------------");
        console.log(error);
    }
}

module.exports = connectDatabase