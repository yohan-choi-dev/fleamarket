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
    if (cluster.worker.id == 1) {
        const express = require("express");

        const path = require("path");
        const fs = require("fs");
        const bodyParser = require("body-parser");

        // import a database and models
        const sequelize = require("./utils/database");
        const User = require("./models/user");
        const Item = require("./models/item");
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

        const ChatService = require("./service/chat-service");
        const app = express();

        app.use(bodyParser.json());

        app.use((req, res, next) => {
            // res.setHeader('Access-Control-Allow-Origin', 'myvmlab.senecacollege.ca');
            res.setHeader("Access-Control-Allow-Origin", "*");

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
        app.use("/api/categories", categoryRoutes);

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
                const mailService = require("./service/mail-service").init();
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        const express = require("express");

        const fs = require("fs");
        const path = require("path");
        const multer = require("multer");
        const bodyParser = require("body-parser");

        const sequelize = require("./utils/database");
        const app = express();

        const User = require("./models/user");
        const Item = require("./models/item");

        const port = 5000;
        const cors = require('cors');

        const corsOptions = {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200
        }

        app.use(cors(corsOptions));
        app.use((req, res, next) => {
            // res.setHeader('Access-Control-Allow-Origin', 'myvmlab.senecacollege.ca');
            res.setHeader("Access-Control-Allow-Origin", "*");

            res.setHeader(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            );

            res.setHeader(
                "Access-Control-Allow-Headers",
                "Content-Type, multipart/from-data"
            );
            if (req.method == "OPTIONS") {
                res.status(200).send();
            }
            next();
        });

        const fileStorage = multer.diskStorage({
            destination: (req, res, cb) => {
                cb(null, "images");
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
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
        app.use(
            multer({ storage: fileStorage, fileFilter: fileFilter }).single(
                "image"
            )
        );
        app.use("/images", express.static(path.join(__dirname, "images")));

        app.use((err, req, res, next) => {
            const status = err.statusCode || 500;
            const message = err.message;
            const data = err.data;

            res.status(status).json({ message: message, data: data });
        });

        sequelize.sync().then(res => {
            app.listen(port, () => {
                console.log(`Image server is listening on ${port}`);
            });
        });

        // In the end, add functionality for controlling thread based on the latency
    }
}
