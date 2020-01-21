// This code will be organized into dedicated js files
const express = require('express');
const session = require('express-session');
const app = express();

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

app.set('trust proxy', 1);
app.use(session({
	secret: 'secret', 
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));



// body-parser extract the entire body portion of an incoming request stream
// and exposes it on req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add routes
app.use(authRoutes);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
	res.status(404).send("Page Not Found");
});

app.get('/', (req,res) => {
	res.render();
});

app.post('/auth', (req, res) => {
    let username = request.body.username;
    let password = request.body.password;
});


app.get('/', (req,res) => res.send('Group05- FleaMarket'));

io.on('connection', (socket) => {
	console.log('A user is connected');
});


http.listen(port, hostname, () => console.log('server is running'));

