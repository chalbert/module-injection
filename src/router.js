'use strict';

var routes = require('./config/routes'),
    reader = require('./reader');

module.exports = function router(url, req, res) {

    console.log('[server] routing', req.url);

    reader.get(routes[url], res);

};
