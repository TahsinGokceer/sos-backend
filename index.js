const express = require('express');
const cors = require('cors'); // Güvenlik için
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');

const connectDatabase = require("./config/databaseConnection")
const userRoutes = require("./routes/userRoutes")
const tournamentRoutes = require("./routes/tournamentRoutes")
const pageRoutes = require("./routes/pageRoutes");
const resultRoutes = require("./routes/resultRoutes");
const UserModel = require("./model/userModel")
const GameModel = require("./model/gameModel")

const options = {
    key: fs.readFileSync('certificates/key.pem'),
    cert: fs.readFileSync('certificates/cert.pem')
};

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', "https://sos-frontend-4a2p.vercel.app", "http://68.219.181.97:3004"], // İzin verilen kaynak (client) adresi
    credentials: true // İzin verilen taleplerde "credentials" (örneğin, cookies, Authorization headers) gönderilmesine izin ver
}));

app.set('trust proxy', true)

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
    secret: 'my_secret', 
    cookie: { 
        httpOnly: true,
        secure: true,
        sameSite: 'none' },
    store: MongoStore.create({ mongoUrl: "mongodb+srv://tgokceer:X3V35570@cluster0.plwkuyo.mongodb.net/sos"}) , 
    resave: true, 
    saveUninitialized: true
}));


// Routes
app.use("/user", userRoutes)
app.use("/tournament", tournamentRoutes)
app.use("/page", pageRoutes)
app.use("/result", resultRoutes)

connectDatabase()


// *********************************** UNITY *****************************************

const server = http.createServer(options, app);
const io = socketIo(server, {
    cors: {
        origin: "*",
    }
})

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);

    socket.on('test', (data) => {
        console.log('Data:', data);
    });

    socket.on("updatedUser", async (userDataString) => {
        const userData = JSON.parse(userDataString)
        console.log("Updated User:\n", userData);

        // Oyun oynayan kullanıcının bilgileri güncelleniyor
        const user = await UserModel.findOne({_id: userData._id})

        user.percentOfWin = userData.percentOfWin
        user.totalGames = userData.totalGames
        user.gamesWon = userData.gamesWon
        user.gamesLost = userData.gamesLost
        user.gamesDraw = userData.gamesDraw
        user.point = userData.point
        user.games = userData.games

        await user.save()        
    })

    socket.on("addGame", async (gameDataString) => {
        const gameData = JSON.parse(gameDataString)
        console.log("Game:\n", gameData);

        // Oynanan oyun database'e ekleniyor.
        // const game = new GameModel({
        //     gameLevel: gameData.gameLevel,
        //     result: gameData.result,
        //     players: gameData.players,
        //     gameType: gameData.gameType
        // })

        // await game.save()
    })

    socket.on("loginUser", async (userData) => {
        console.log("Login User:\n", userData);
        const email = userData[0]
        const password = userData[1]

        let user = await UserModel.findOne({ userName: email })

        if (user) {
            if (user.password === password) {
                // req.session.userID = user._id
                socket.emit("loginSuccessful", user)

                // res.status(201).json({success: true, user})  // Giriş işlemi başarılı
            } else {
                socket.emit("errorLogin", "Wrong Password")
                // res.status(200).json({ message: 'Wrong Password' });
            }
        } else {
            user = await UserModel.findOne({ email: email })

            if (user) {
                if (user.password === password) {
                    // req.session.userID = user._id
                    socket.emit("loginSuccessful", user)

                    // res.status(201).json({success: true, user})   // Giriş işlemi başarılı
                } else {
                    socket.emit("errorLogin", "Wrong Password")
                    // res.status(200).json({ message: 'Wrong Password' });    
                }
            } else {
                socket.emit("errorLogin", 'Wrong username or email')
                // res.status(200).json({ message: 'Wrong username or email' });
            }
        }
    })

    socket.on("registerUser", async (userData) => {
        console.log("Register User:\n", userData);
        const userName = userData[0]
        const email = userData[1]
        const password = userData[2]

        const existingUser = await UserModel.findOne({ userName: userName });
        const existingUserMail = await UserModel.findOne({ email: email });
        if (existingUser) {
            console.log("AAAAAAAAAAAAAAAAA");
            socket.emit("errorRegister", "This username is already taken.")
            // return res.status(200).json({ message: 'This username is already taken.' });
        }
        else if (existingUserMail) {
            console.log("BBBBBBBBBBBBBBBBB");
            socket.emit("errorRegister", "This email is already exist.")
            // return res.status(200).json({ message: 'This email is already exist.' });
        }
        else {
            const user = new UserModel({
                userName: userName,
                email: email,
                password: password,
                percentOfWin: 0,
                totalGames: 0,
                gamesWon: 0,
                gamesLost: 0,
                gamesDraw: 0,
                point: 0,
                games: []
            });

            await user.save();
            socket.emit("registerSuccessful", "register successful")
        }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get("/game/find", async (req, res) => {
    id = req.session.userID;
    let user = await UserModel.findOne({ _id: id })
    const user2 = await UserModel.findOne({ userName: "Hande" })
    console.log("Game Controller: " + user + user2);
    io.emit('hi', [user, user2]);
    res.json({ user })
})

// server start
const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});