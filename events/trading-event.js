module.exports = (io, redis) => {
    const trading = io.of('/trading')
    trading.on('connection', async (socket) => {
        try {
            
        } catch (err) {
            console.error(err)
        }
    })
}