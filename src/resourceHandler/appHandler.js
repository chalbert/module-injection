'use strict';

var reader = require('../reader'),
    getTypeHeaders = require('../util/getTypeHeaders'),
    locator = require('../locator');

module.exports = function appHandler (resource, req, res) {

    res.writeHead(200, getTypeHeaders('html'));

    res.write(`
        <!DOCTYPE html>
        <html ng-app="${resource.name}">
        <head lang="en">
            <meta charset="UTF-8">
            <title>${resource.title}</title>
            <script src="vendor/angular/angular.js"></script>
            <script src="bootstrap/${resource.name}.js"></script>
            <script src="apps/setup/setup-ctrl.js"></script>
    `);


    Promise.all([
        reader.read(`apps/${resource.name}/${resource.name}.html`),
        locator.services('apps/setup/setup-ctrl.js').then(function (services) {

            console.log('[appHandler] services', services);

            res.write(services.map(function (service) {
                return `<script src="${service}"></script>`;
            }).join('\n'));
        })
    ]).then(function (results) {

        res.write('</head>');
        res.write(results[0]);
        res.end();
    }).catch(function (err) {
        console.error(err)
    });
}
