const mongoose = require("mongoose")

async function connectDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/sos")

    } catch (error) {
        console.log("------------------------------------ HATA ---------------------------------");
        console.log(error);
    }
}

module.exports = connectDatabase