// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

const findGame = async (req, res) => {
    id = req.session.userID;
    console.log("Game Controller: " + id);
    // socket.emit('hi', id);
    res.json({id})    
}



module.exports = {findGame}