const cluster = require('cluster')
const numWorkers = process.env.NODE_ENV ? require('os').cpus().length : 2

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)

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
    require('./server') // run server.js
}
