'use strict';

var spdy = require('spdy'),
    fs = require('fs'),
    reader = require('./src/reader'),
    spdyConfig = require('./config/spdy-config'),
    serverConfig = require('./config/server-config');

//var contentTypes = {
//    html: 'text/html',
//    js: 'application/javascript'
//};
//

console.log('[server] Start');

var server = spdy.createServer(spdyConfig, function(req, res) {

    console.log('[server] respond', req.url);

    //reader.get(req.url, res);

    // This is our awesome dependency manager!
    //if (req.url === '/index.html') {
    //    push('/main.html', res),
    //    push('/footer.html', res),
    //    push('/header.html', res),
    //    push('/nav.html', res),
    //    push('/services/components/u-view/u-view.html', res)
    //}


});

server.listen(serverConfig.port);
