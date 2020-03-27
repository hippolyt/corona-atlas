const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    const proxy = createProxyMiddleware({
        target: 'http://192.168.1.229:5000',
        changeOrigin: true,
    })

    app.use('/api-internal', proxy)
    app.use('/auth', proxy)
}
