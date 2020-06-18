const express = require("express");
const app = express();

const session = require('express-session');

const {
    uuid
} = require('uuidv4')

// parse application/json
app.use(express.json());


const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())


const fs = require("fs");


// You need to copy the config.template.json file and fill out your own secret
const config = require('./config/config.json');

// Middleware, sits between the request and the response
app.use(session({
    genid: (req) => {
        console.log('Inside the session middleware')
        console.log(req.sessionID)
        return uuid() // use UUIDs for session IDs
    },
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
}));

// Setup rateLimit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 25 // limit each IP to 15 requests per windowMs
});

app.use(limiter);

app.use('/signup', authLimiter);
app.use('/signin', authLimiter);

/* Setup Knex with Objection */
const {
    Model
} = require('objection');
const Knex = require('knex');
const knexfile = require('./knexfile.js');

const knex = Knex(knexfile.development);

Model.knex(knex);

app.use(express.static('public'));
app.use(express.static('pictures'));


// Import routes
const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');
const videosRoute = require("./routes/pictures");

// Set up routes with our server
app.use(videosRoute.router);
app.use(authRoute);
app.use(usersRoute);

// Reads the HTML files into variables so its possible to combine them as you want.
// This way you do not need to have duplication HTML code.
const navbarPage = fs.readFileSync("./public/navbar/navbar.html", "utf8");
const footerPage = fs.readFileSync("./public/footer/footer.html", "utf8");

const frontpagePage = fs.readFileSync("./public/frontpage/frontpage.html", "utf8");
const playerPage = fs.readFileSync("./public/player/player.html", "utf8");
const uploadPage = fs.readFileSync("./public/upload/upload.html", "utf8");
const signinPage = fs.readFileSync("./public/signin/signin.html", "utf8");
const signupPage = fs.readFileSync("./public/signup/signup.html", "utf8");
const socketPage = fs.readFileSync("./public/socket/socket.html", "utf8");

function checkAuth(req, res, next) {
    if (!req.session.user) {
        req.session.error = "Access denied!"
        res.redirect("/signin")
    } else {
        next();
    }
}

app.get("/", checkAuth, (req, res) => {
    videosRoute.readFromDB();
    return res.send(navbarPage + frontpagePage + footerPage);
});

app.get("/player/:videoId", checkAuth, (req, res) => {
    return res.send(navbarPage + playerPage + footerPage);
});

app.get("/upload", checkAuth, (req, res) => {
    return res.send(navbarPage + uploadPage + footerPage);
});

app.get("/signin", (req, res) => {
    return res.send(navbarPage + signinPage + footerPage);
});

// For testing purposes, no real use yet
app.get("/socket", checkAuth, (req, res) => {
    return res.send(navbarPage + socketPage + footerPage);
})

app.get("/signup", (req, res) => {
    return res.send(navbarPage + signupPage + footerPage);
});

app.get("/signout", (req, res) => {
    req.session.user = null;
    return res.redirect("/");
});

// Setting up the server with port number
const port = process.env.PORT ? process.env.PORT : 3000;
const server = app.listen(port, (error) => {
    if (error) {
        console.log("Error starting the server");
    }
    console.log("This server is running on port", server.address().port);

    videosRoute.readFromDB();
});

// Sockets
const io = require("socket.io")(server);
// Sockets
io.on('connection', socket => {
    socket.on('a client wrote this', (data) => {
        // emits to all clients
        io.emit("A client said", {
            thoughts: escape(data.thoughts)
        });
    });
});