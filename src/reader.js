'use strict';

var fs = require('fs'),
    writer = require('./writer');

function read (filePath) {

    console.log('[reader] filePath', filePath);

    return new Promise(function (resolve, reject) {
        fs.readFile('www/' + filePath, 'utf8', function (err, fileContent) {
            if (err) {
                reject(err);
            }

            resolve(fileContent);

        });
    });



}

module.exports = { read: read};
