'use strict';

var routes = require('./config/routes');

function getResource (url) {
    var route = routes[url];

    if (typeof route === 'string' && route.match(/^@(.*)/)) {
        route = getResource(route.match(/^@(.*)/)[1]);
    }

    console.log('[server] route', route);

    return route;

}

module.exports = function router(url, req, res) {

    console.log('[router] routing', req.url);

    var resource = getResource(url);

    require('./resourceHandler/' + resource.handler + 'Handler')(resource, res, res);

};
