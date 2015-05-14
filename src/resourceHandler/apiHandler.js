'use strict';

var getTypeHeaders = require('../util/getTypeHeaders');

module.exports = function apiHandler(resource, req, res) {

    console.log('[apiHander]', req.url);

    var apiName = req.url.match(/api\/(.*)/)[1];
    var api = require(`../../api/${apiName}`);

    if (api[req.method]) {
        api[req.method](req, res);
    } else {
        res.sendHeaders(400);
        res.end();
    }

};
