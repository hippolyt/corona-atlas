const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api-internal',
        createProxyMiddleware({
            target: 'http://192.168.1.229:5000',
            changeOrigin: true,
        })
    );

    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://192.168.1.229:5000',
            changeOrigin: true,
        })
    );
};