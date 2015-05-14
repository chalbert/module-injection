'use strict';

var reader = require('./reader'),
    snakeCase = require('./util/snakeCase');

var matchers = [
    {
        match: /Resource$/,
        dir: 'platform/resources/'
    }
];

function services (fileName) {

    console.log('[locator]', fileName);

    return reader.read(fileName)
        .then(function (fileContent) {
            // @todo use ngAnnote logic
            var services = fileContent.match(/function \((.*)\)/)[1].replace(/\s/, '').split(',');

            console.log('[locator] services', services);

            var deps = services.map(function (service) {
                var matcher = matchers.find(function (matcher) {
                    return service.match(matcher.match);
                });


                var name = snakeCase(service);
                return `${matcher.dir}${name}/${name}.js`;
            });

            console.log('[locator] deps', deps);

            return deps;
        });

}

module.exports = { services: services };
