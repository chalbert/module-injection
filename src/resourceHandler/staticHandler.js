'use strict';

var reader = require('../reader'),
    getFileHeaders = require('../util/getFileHeaders');

module.exports = function staticHandler (resource, req, res) {

    console.log('[staticHandler]', req.url);

    res.writeHead(200, getFileHeaders(req.url));

    reader.read(resource.dir + req.url)
        .then(function (fileContent) {
            console.log('[staticHandler] done');
            res.write(fileContent);
            res.end();
        });
}
