'use strict';

var contentTypes = require('../constant/contentTypes'),
    getExtension = require('./getExtension');

function getHeaders (type) {
    var headers = {};
    headers['Content-Type'] = contentTypes[type];
    return headers;
}

module.exports = function getFileHeaders(filePath) {
    var extension = getExtension(filePath);
    return getHeaders(extension);
};
