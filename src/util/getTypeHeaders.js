'use strict';

var contentTypes = require('../constant/contentTypes');

module.exports = function getTypeHeaders (type) {
    var headers = {};
    headers['Content-Type'] = contentTypes[type];
    return headers;
};
