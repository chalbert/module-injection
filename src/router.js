'use strict';

var routes = require('./config/routes');

function getResource (url) {
    var route = routes.find(function (route) {
        return url.match(route.match);
    });

    if (route.link) {
        route = getResource(route.link);
    }

    console.log('[server] route', route);

    return route;

}

module.exports = function router(url, req, res) {

    console.log('[router] routing', req.url);

    var resource = getResource(url);

    require('./resourceHandler/' + resource.handler + 'Handler')(resource, req, res);

};
