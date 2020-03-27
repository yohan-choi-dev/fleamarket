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
    const PORT = process.env.PORT | 12218
    const app = express()

    const path = require('path')
    const bodyParser = require('body-parser')
    const cors = require('cors')

    const sequelize = require('./utils/database')
    const redis = require('./utils/redis')
    const io = require('./socket/socket')
    const mailService = require('./service/mail-service')

    const authRoutes = require('./routes/auth')
    const itemRoutes = require('./routes/items')
    const categoryRoutes = require('./routes/category')
    const imageRoutes = require('./routes/image')
    const userRoutes = require('./routes/users')
    const favoriteRoutes = require('./routes/favorites')

    const errorHandler = require('./middlewares/error-handler')

    //const ChatService = require('./service/chat-service')

    if (!process.env.NODE_ENV) {
        const corsOptions = {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200
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

    app.use(errorHandler())

    const runServer = async () => {
        try {
            await sequelize.sync()

            const server = app.listen(PORT, () =>
                console.log(`Worker ${process.pid} is running on ${PORT}`)
            )

            redis.init()
            const client = redis.getClient()

            io.init(server, client)

            if (process.env.NODE_ENV) {
                mailService.init()
            }
        } catch (err) {
            console.error(err)
        }
    }
    runServer()
}
