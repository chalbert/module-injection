'use strict';

var reader = require('../reader'),
    getTypeHeaders = require('../util/getTypeHeaders');

module.exports = function appHandler (resource, req, res) {

    res.writeHead(200, getTypeHeaders('html'));

    res.write(`
        <!DOCTYPE html>
        <html>
        <head lang="en">
            <meta charset="UTF-8">
            <title>${resource.title}</title>
        </head>
    `);

    reader.read(`apps/${resource.name}/${resource.name}.html`)
        .then(function (appContent) {
            req.write(appContent);
            req.end();
        });
}
