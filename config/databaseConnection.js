require('dotenv').config();
const mongoose = require("mongoose")

async function connectDatabase() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        
    } catch (error) {
        console.log("------------------------------------ HATA ---------------------------------");
        console.log(error);
    }
}

module.exports = connectDatabase