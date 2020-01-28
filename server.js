// This code will be organized into dedicated js files
const express = require('express');

const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');

// import a database and models
const sequelize = require('./utils/database');
const Users = require('./models/users');
const Items = require('./models/items');

const hostname = '10.102.112.129';
const port = process.env.PORT | 10034;

const authRoutes = require('./routes/auth.js');
const itemRoutes = require('./routes/item.js');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
    ) {
        cb(null, true);
    } {
        cb(null, false);
    }
}


/*
  These model will be used in the future

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

const worker = require('worker_threads');
*/


// body-parser extract the entire body portion of an incoming request stream
// and exposes it on req.body
// For the future maintainance, body-parser from 3rd party will be used.
// express.json() or express.urlencoded can be not included in express depends on the version of express
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// This middleware allows CORS
app.use((req, res, next) => {
    // This header allows the specific origin to access to the api
    // res.setHeader('Access-Control-Allow-Origin', 'myvmlab.senecacollege.ca');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // This header aloows the spcific method to be used
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


/*
app.use({
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image');
});
*/

app.use('/auth', authRoutes);
app.use('/item', itemRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    // status 500 code: internal server error
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
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

