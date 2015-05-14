'use strict';

var reader = require('../reader'),
    getTypeHeaders = require('../util/getTypeHeaders'),
    injector = require('../injector');

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

    var appPath = `apps/${resource.name}/${resource.name}.html`;

    Promise.all([
        reader.read(appPath),
        injector.analyseFile('apps/setup/setup-ctrl.js').then(function (deps) {
            console.log('[appHandler] services', deps);
            injector.inject(deps, res)
        })
    ]).then(function (results) {
        var appContent = results[0];

        injector.analyseContent(appPath, appContent).then(function (deps) {
            console.log('[appHandler] components', deps);

            injector.inject(deps, res);

            res.write('</head>');
            res.write(appContent);
            res.end();
        });

    }).catch(function (err) {
        console.error(err)
    });
}
