const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

} else {

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

    const port = process.env.PORT | 10034 | 3000;

    const authRoutes = require("./routes/auth");
    const itemRoutes = require("./routes/items");

    const ChatService = require("./service/chat-service");
    const app = express();

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
        res.setHeader("Access-Control-Allow-Origin", "*");

        // This header aloows the spcific method to be used
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE, OPTIONS"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
        );
        if (req.method == "OPTIONS") {
            res.status(200).send();
        }
        next();
    });

    app.use("/api/auth", authRoutes);
    app.use("/api/items", itemRoutes);

    app.use((error, req, res, next) => {
        const status = error.statusCode || 500;
        const message = error.message;
        const data = error.data;
        res.status(status).json({ message: message, data: data });
    });

    sequelize
        .sync()
        .then(res => {
            const server = app.listen(port, () =>
                console.log(`Worker ${process.pid} is running on ${port}`)
            );
            if (process.env.NODE_ENV == 'production') {
                const mailService = require("./service/mail-service").init();
            }
        })
        .catch(err => {
            console.log(err);
        });
}
