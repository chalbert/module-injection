'use strict';

module.exports = function (fileName) {
    return fileName.match(/\.(.*)$/)[1];
};
