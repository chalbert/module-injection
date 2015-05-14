'use strict';

var fs = require('fs'),
    getExtension = require('./util/getExtension'),
    getFileHeaders = require('./util/getFileHeaders');

function read (filePath, fn) {
    fs.readFile('www/' + filePath, 'utf8', function (err, fileContent) {
        fn(err, fileContent);
    });
}

function get (filePath, res) {

    read(filePath, function (err, fileContent) {
        if (err) {
            res.writeHead(404);
            res.end('File not Found');
        }

        res.writeHead(200, getFileHeaders(filePath));

        if (getExtension(filePath) === 'js' && !filePath.match(/^lib\/$/)) {
            // Expose source map. Dev header?
            //fileContent = babel.transform(fileContent, { modules: "system" }).code;
        }

        res.end(fileContent);
    });


}

module.exports = { read: read, get: get };
