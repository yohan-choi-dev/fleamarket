const cluster = require('cluster')
const numWorkers = process.env.NODE_ENV ? require('os').cpus().length : 1

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)

    // Fork workers.
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        const message = `
        Worker ${worker.process.id} died
        code: ${code}
        signal: ${signal}
        `
        console.log(message)
    })
} else {
    const express = require('express')
    const app = express()

    const path = require('path')
    const bodyParser = require('body-parser')
    const cors = require('cors')

    const sequelize = require('./utils/database')
    const redis = require('./utils/redis')
    const io = require('./socket/socket')

    const User = require('./models/user')
    const Item = require('./models/item')
    const ImageLink = require('./models/image-link')
    const UserItemBridge = require('./models/user-item-bridge')
    const Category = require('./models/category')
    const ItemCategoryBridge = require('./models/item-category-bridge')
    const Comment = require('./models/comment')
    const Token = require('./models/token')
    const Feedback = require('./models/feedback')
    const Message = require('./models/message')
    const Notification = require('./models/notification')
    const Trade = require('./models/trade')

    const port = process.env.PORT | 12218

    const authRoutes = require('./routes/auth')
    const itemRoutes = require('./routes/items')
    const categoryRoutes = require('./routes/category')
    const imageRoutes = require('./routes/image')
    const userRoutes = require('./routes/users')
    const favoriteRoutes = require('./routes/favorites')

    const ChatService = require('./service/chat-service')

    if (!process.env.NODE_ENV) {
        const corsOptions = {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200,
        }
        app.use(cors(corsOptions))
    }
    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: false, limit: '50mb' }))

    app.use('/images', express.static(path.join(__dirname, 'images')))

    app.use('/api/auth', authRoutes)
    app.use('/api/items', itemRoutes)
    app.use('/api/categories', categoryRoutes)
    app.use('/api/images', imageRoutes)
    app.use('/api/users', userRoutes)
    app.use('/api/favorites', favoriteRoutes)

    app.use((error, req, res, next) => {
        const status = error.statusCode || 500
        const message = error.message
        const data = error.data
        res.status(status).json({ message: message, data: data })
    })

    sequelize
        .sync()
        .then((res) => {
            const server = app.listen(port, () =>
                console.log(`Worker ${process.pid} is running on ${port}`)
            )

            const client = redis.init()
            io.init(server, client)
            io.listenSocketEvents()

            if (process.env.NODE_ENV) {
                const mailService = require('./service/mail-service').init()
            }
        })
        .catch((err) => {
            console.log(err)
        })
}
