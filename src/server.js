'use strict';

var spdy = require('spdy'),
    spdyConfig = require('./config/spdy-config'),
    serverConfig = require('./config/server-config'),
    router = require('./router.js');

console.log('[server] Start');

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

var server = spdy.createServer(spdyConfig, function(req, res) {
    router(req.url, req, res);
});

server.listen(serverConfig.port);
