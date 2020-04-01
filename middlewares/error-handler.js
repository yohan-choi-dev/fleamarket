module.exports = (err, req, res, next) => {
    if (req.headersSent) {
        return next(err)
    }
    const status = err.statusCode || 500
    const message = err.message
    const data = err.data
    res.status(status).json({ message: message, data: data })
}
