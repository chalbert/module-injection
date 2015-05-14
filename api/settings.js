'use strict';

var db = require('../db/db'),
    getTypeHeaders = require('../src/util/getTypeHeaders');

module.exports = {
    GET: function (req, res) {
        res.writeHead(200, getTypeHeaders('json'));
        var payload = JSON.stringify(db.settings);
        res.write(JSON.stringify(db.settings));
        res.end();
    },
    PUT: function (req, res) {
        console.log('put');
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            db.settings = JSON.parse(body);
            res.writeHead(200, getTypeHeaders('json'))
            res.end();
        });
    }
}
