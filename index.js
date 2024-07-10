const express = require('express');
const cors = require('cors'); // Güvenlik için
const session = require('express-session');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');

const connectDatabase = require("./config/databaseConnection")
const userRoutes = require("./routes/userRoutes")
const tournamentRoutes = require("./routes/tournamentRoutes")
const pageRoutes = require("./routes/pageRoutes");
const gameRoutes = require("./routes/gameRoutes")

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({
    origin: 'http://localhost:3000', // İzin verilen kaynak (client) adresi
    credentials: true // İzin verilen taleplerde "credentials" (örneğin, cookies, Authorization headers) gönderilmesine izin ver
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(session({ key: "Cookie", secret: 'my_secret', resave: true, saveUninitialized: true }));

// Routes
app.use("/user", userRoutes)
app.use("/tournament", tournamentRoutes)
app.use("/page", pageRoutes)
app.use("/game", gameRoutes)

connectDatabase()



// *********************************** UNITY *****************************************

/*
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
*/

// server start
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// app.listen(3001, (err) => {
//     if (err) console.log(err);
//     console.log("server started");
// })