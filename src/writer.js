'use strict';

var getExtension = require('./util/getExtension'),
    getFileHeaders = require('./util/getFileHeaders');

function write (filePath, fileContent, res, req) {

    console.log('[writer] writing', filePath);

    res.writeHead(200, getFileHeaders(filePath));

    if (getExtension(filePath) === 'js' && !filePath.match(/^lib\/$/)) {
        // Expose source map. Dev header?
        //fileContent = babel.transform(fileContent, { modules: "system" }).code;
    }

    res.end(fileContent);
}



module.exports = { write: write };
