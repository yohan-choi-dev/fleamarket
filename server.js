const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < 2; i++) {
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
    const cryptoRandomString = require('crypto-random-string');
    const cors = require('cors');

    // import a database and models
    const sequelize = require("./utils/database");
    const User = require("./models/user");
    const Item = require("./models/item");
    const ImageLink = require('./models/image-link');
    const UserItemBridge = require("./models/user-item-bridge");
    const Category = require("./models/category");
    const ItemCategoryBridge = require("./models/item-category-bridge");
    const Comment = require("./models/comment");
    const Token = require("./models/token");
    const Feedback = require("./models/feedback");
    const Message = require("./models/message");
    const Notification = require("./models/notification");
    const Trade = require("./models/trade");

    const port = 12218;

    const authRoutes = require("./routes/auth");
    const itemRoutes = require("./routes/items");
    const categoryRoutes = require("./routes/category");
    const imageRoutes = require("./routes/image");
    const userRoutes = require('./routes/users');

    const ChatService = require("./service/chat-service");
    const app = express();

    const corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    }

    app.use(cors(corsOptions));

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, PATCH, DELETE, OPTIONS"
        );

        res.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization, mutilpart/form-data, applcation/json"
        );
        if (req.method == "OPTIONS") {
            res.status(200).send();
        }
        next();
    });

    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: false, limit: '50mb' }));

    app.use("/images", express.static(path.join(__dirname, "images")));

    app.use("/api/auth", authRoutes);
    app.use("/api/items", itemRoutes);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/images", imageRoutes);
    app.use("/api/users", userRoutes);

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
