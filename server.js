module.exports = (async () => {
    const express = require('express')
    const PORT = process.env.PORT | 12218
    const app = express()

    const sequelize = require('./utils/database')
    const redisDbFactory = require('./factories/redis-db-factory')

    const ioService = require('./service/io-service')

    const mailService = require('./service/mail-service')

    if (process.env.NODE_ENV == 'development') {
        const corsOptions = {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200
        }
        app.use(require('cors')(corsOptions))
    }

    const redisConfig = {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    }

    app.use(require('compression')())
    app.use(require('body-parser').json())

    app.use(express.urlencoded({ extended: false, limit: '50mb' }))
    app.use('/images', express.static(require('path').join(__dirname, 'images')))
    app.use('/api/auth', require('./routes/auth'))
    app.use('/api/items', require('./routes/items'))
    app.use('/api/categories', require('./routes/category'))
    app.use('/api/images', require('./routes/image'))
    app.use('/api/users', require('./routes/users'))
    app.use('/api/favorites', require('./routes/favorites'))
    app.use('/api/comments', require('./routes/comments'))
    app.use(require('./middlewares/error-handler'))
    try {
        await sequelize.sync()
        const server = app.listen(PORT, () =>
            console.log(`Worker ${process.pid} is running on ${PORT}`)
        )
        const redis = redisDbFactory(redisConfig)
        ioService(server, redis)
        if (process.env.NODE_ENV === 'production') {
            mailService.init()
        }
    } catch (err) {
        console.error(err)
    }
})()
