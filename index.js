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
const UserModel = require("./model/userModel")
const GameModel = require("./model/gameModel")

const app = express();
const server = http.createServer(app);
const io = socketIo(server)

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

connectDatabase()


// *********************************** UNITY *****************************************

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);

    socket.on('test', (data) => {
        console.log('Data:', data);
    });    

    socket.on("updatedUser", async (userData) => {
        console.log("Updated User: \n", userData);

        // Oyun oynayan kullanıcının bilgileri güncelleniyor
        // const user = await UserModel.findOne({_id: userData._id})

        // user.percentOfWin = userData.percentOfWin
        // user.totalGames = userData.totalGames
        // user.gamesWon = userData.gamesWon
        // user.gamesLost = userData.gamesLost
        // user.gamesDraw = userData.gamesDraw
        // user.point = userData.point
        // user.games = userData.games

        // await user.save()        
    })

    socket.on("addGame", async(gameData) => {
        // Oynanan oyun database'e ekleniyor.
        // const game = new GameModel({
        //     gameLevel: gameData.gameLevel,
        //     result: gameData.result,
        //     players: gameData.players,
        //     gameType: gameData.gameType
        // })

        // await game.save()
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get("/game/find", async(req, res) => {
    id = req.session.userID;
    let user = await UserModel.findOne({ _id: id })
    const user2 = await UserModel.findOne({userName: "Hande"})
    console.log("Game Controller: " + user + user2);
    io.emit('hi', [user, user2]);
    res.json({user})    
}) 

// server start
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// app.listen(3001, (err) => {
//     if (err) console.log(err);
//     console.log("server started");
// })


