const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const findGame = async (req, res) => {
    const id = req.session.userID
    console.log("Game Controller: " + id);

    io.on('connection', (socket) => {
        console.log('a user connected');
    
        socket.on('test', async (data) => {
            console.log('Data:', data);
    
            // await connectDatabase()
            const dbData = 321
    
            socket.emit('hi', dbData);
        });    
    
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
    res.json({id})
}


module.exports = {findGame}