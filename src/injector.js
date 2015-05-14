'use strict';

var reader = require('./reader');

function getHeaders (type) {
    var headers = {};
    headers['Content-Type'] = contentTypes[type];
    return headers;
}

function getFileHeaders (filePath) {
    var extension = getExtention(filePath);
    return getHeaders(extension);
}


function push (filePath, res) {

    var stream = res.push(filePath, getFileHeaders(filePath));

    stream.on('error', function (err) {
        console.log('push error', err);
    });

    reader.read(filePath, function (err, fileContent) {
        stream.end(fileContent);
    });

}

module.exports = { push: push };
