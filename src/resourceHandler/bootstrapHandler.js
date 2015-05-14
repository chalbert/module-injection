'use strict';

var getTypeHeaders = require('../util/getTypeHeaders');

module.exports = function appHandler (resource, req, res) {

    console.log('[bootstrapHandler]');

    var appName = req.url.match(/bootstrap\/(.*)\.js/)[1];

    res.writeHead(200, getTypeHeaders('js'));

    res.write(`
        angular.module('vend', []);
        angular.module('${appName}', ['vend']);
    `);

    res.end();
}
