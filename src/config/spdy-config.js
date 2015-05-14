'use strict';

var fs = require('fs');

module.exports = {
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.crt'),
    ca: fs.readFileSync('keys/server.csr')
};
