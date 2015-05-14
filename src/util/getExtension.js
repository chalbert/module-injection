'use strict';

module.exports = function (fileName) {
    console.log('[getExtension] fileName', fileName);
    return fileName.match(/\.(.*)$/)[1];
};
