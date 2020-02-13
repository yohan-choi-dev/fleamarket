const express = require("express");

const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");

// import a database and models
const sequelize = require("./utils/database");
const { User, Token } = require("./models/user");
const Item = require("./models/item");
const Comment = require("./models/comment");
const Category = require("./models/category");
const Feedback = require("./models/feedback");
const Message = require("./models/message");
const Notification = require("./models/notification");
const UserItemBridge = require("./models/user-item-bridge");

const hostname = "10.102.112.129";
const port = process.env.PORT | 10034;

const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/items");

const ChatService = require("./service/chat-service");
const app = express();
/*
const corsOptions = {
    origin: "http://myvmlab.senecacollege.ca:6764",
    optionsSuccessStatus: 200
};
*/
const fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ) {
        cb(null, true);
    }
    {
        cb(null, false);
    }
};

app.use(bodyParser.json());

// This middleware allows CORS
app.use((req, res, next) => {

    // This header allows the specific origin to access to the api
    // res.setHeader('Access-Control-Allow-Origin', 'myvmlab.senecacollege.ca');
    res.setHeader('Access-Control-Allow-Origin', 'http://myvmalab.senecacollege.ca:6764');

    // This header aloows the spcific method to be used
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method == 'OPTIONS') {
        res.status(200).send();
    }
    next();
})
app.use("/auth", authRoutes);
app.use("/items", itemRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    // status 500 code: internal server error
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", (req, res, next) => {
    res.sendFile(__dirname, "../frontend/build", "index.html");
});

sequelize
    .sync()
    .then(res => {
        const server = app.listen(port, () => console.log("Server is running"));
        const mailService = require("./service/mail-service").init();
    })
    .catch(err => {
        console.log(err);
    });
