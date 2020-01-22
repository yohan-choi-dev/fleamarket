// This code will be organized into dedicated js files
const express = require('express');
const session = require('express-session');
const app = express();

const favicon = require('express-favicon');

const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

const mysql = require('mysql');

const hostname = '10.102.112.129';
const port = process.env.PORT | 10034;

const cors = require('cors');

const authRoutes = require('./routes/auth.js');


const connection = mysql.createConnection({
    host: "mymysql.senecacollege.ca",
    user: "prj666_201a05",
    password: "hgAZ@4435"
});

connection.connect(err => {
    if (err) throw err;
    console.log('Server is connected to MySQL successfully!');
});

//app.set('trust proxy', 1);

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));


// CORS ( Cross-Origin Resource Sharing) allows to connect nodejs server to react application
//app.use(cors);

// body-parser extract the entire body portion of an incoming request stream
// and exposes it on req.body
// For the future maintainance, body-parser from 3rd party will be used.
// express.json() or express.urlencoded can be not included in express depends on the version of express
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


// Add routes
//app.use(require('./routes/auth.js'));
//app.use(require('./routes/chat.js'))


app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

io.on('connection', (socket) => {
    console.log('A user is connected');
});

app.get('/*', (req,res) =>  {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

http.listen(port, hostname, () => console.log('server is running'));

