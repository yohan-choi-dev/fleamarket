const { createProxyMiddleware }= require('http-proxy-middleware');
const proxy = createProxyMiddleware;
module.exports = function(app) {
    app.use(proxy('/api/auth', { target: 'http://localhost:12218' }))
    app.use(proxy('/api/items', { target: 'http://localhost:12218' }))
    app.use(proxy('/api/categories', { target: 'http://localhost:12218' }))

    app.use(proxy('/api/images', { target: 'http://localhost:5000' }))
}
