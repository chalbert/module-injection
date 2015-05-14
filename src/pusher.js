'use strict';

var reader = require('./reader');

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


// This is our awesome dependency manager!
//if (req.url === '/index.html') {
//    push('/main.html', res),
//    push('/footer.html', res),
//    push('/header.html', res),
//    push('/nav.html', res),
//    push('/services/components/u-view/u-view.html', res)
//}
