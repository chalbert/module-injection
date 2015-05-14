'use strict';

var getTypeHeaders = require('../util/getTypeHeaders');

module.exports = function appHandler (resource, req, res) {

    console.log('[bootstrapHandler]');

    res.writeHead(200, getTypeHeaders('js'));

    res.write(`
        (function(){
           console.log('bootstrap');
        })();
    `);

    res.end();
}
