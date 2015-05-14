'use strict';

var getExtension = require('./getExtension'),
    getTypeHeaders = require('./getTypeHeaders');

module.exports = function getFileHeaders(filePath) {
    var extension = getExtension(filePath);
    return getTypeHeaders(extension);
};
