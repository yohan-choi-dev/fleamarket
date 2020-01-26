// This code will be organized into dedicated js files
const express = require('express');

const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const graphqlHttp = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

// import a database and models
const sequelize = require('./utils/database');
const Users = require('./models/users');
const Items = require('./models/items');
//const mysql = require('mysql2');



const hostname = '10.102.112.129';
const port = process.env.PORT | 10034;

const cors = require('cors');

const authRoutes = require('./routes/auth.js');

/*
  These model will be used in the future

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
//
// if we wanna add favicon for the fleamartket, we can use this module
const favicon = require('express-favicon');

// worker_threads enable node to use multi-thread
// it will be a good solution  to solve cpu intensive task
// but according to nodejs.org, built-in asynchronous I/O operations are more efficient than Workers.
// Therefore, worker_threads will be used to format uploaded image.
// In the future, worker object will be move to the other module.
const worker = require('worker_threads');
*/

const app = express();




// CORS ( Cross-Origin Resource Sharing) allows to connect nodejs server to react application
//app.use(cors);

// body-parser extract the entire body portion of an incoming request stream
// and exposes it on req.body
// For the future maintainance, body-parser from 3rd party will be used.
// express.json() or express.urlencoded can be not included in express depends on the version of express
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));


app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    // status 500 code: internal server error
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});


// Every page request goes into react application
app.get('/*', (req,res) =>  {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

sequelize.sync()
    .then(result => {
        // console.log(result);
        // http.listen(port, hostname, () => console.log('server is running'));
        http.listen(port, () => console.log ('Server is running'));

    })
    .catch(err => {
        console.log(err);
    })

