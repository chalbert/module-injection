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
            <script src="vendor/angular/angular.js"></script>
            <script src="bootstrap/${resource.name}.js"></script>
            <script src="apps/setup/setup-ctrl.js"></script>
        </head>
    `);

    reader.read(`apps/${resource.name}/${resource.name}.html`)
        .then(function (appContent) {
            res.write(appContent);
            res.end();
        });
}
