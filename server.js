const express = require('express')
const PORT = process.env.PORT | 12218
const app = express()

const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')

const config = require('./utils/config')

const sequelize = require('./utils/database')
const redisDbFactory = require('./factories/redis-db-factory')
const ioFactory = require('./factories/io-factory')

const ioService = require('./service/io-service')

const mailService = require('./service/mail-service')

const authRoutes = require('./routes/auth')
const itemRoutes = require('./routes/items')
const categoryRoutes = require('./routes/category')
const imageRoutes = require('./routes/image')
const userRoutes = require('./routes/users')
const favoriteRoutes = require('./routes/favorites')

const errorHandler = require('./middlewares/error-handler')

if (!process.env.NODE_ENV) {
    const corsOptions = {
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions))
}

const redisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
}

app.use(compression())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false, limit: '50mb' }))

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/users', userRoutes)
app.use('/api/favorites', favoriteRoutes)

app.use(errorHandler)

sequelize
    .sync()
    .then(() => {
        const server = app.listen(PORT, () =>
            console.log(`Worker ${process.pid} is running on ${PORT}`)
        )

        const redis = redisDbFactory(redisConfig)

        const io = ioService(server, redis)

        if (process.env.NODE_ENV === 'production') {
            mailService.init()
        }
    })
    .catch((err) => {
        console.error(err)
    })
