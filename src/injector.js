'use strict';

var reader = require('./reader'),
    snakeCase = require('./util/snakeCase'),
    getExtension = require('./util/getExtension');

var matchers = [
    {
        match: /Resource$/,
        dir: 'platform/resources/'
    }
];

function getComponents (fileContent) {
    var components = fileContent.match(/<vd-[^>]+>/g);

    if (!components) {
        return [];
    }

    return components.map(function (component) {
        console.log('[injector] component', component);
        var componentName = component.replace(/[<>]/g, '');


        // @todo add real namespace handling
        if (componentName.match(/^vd-/)) {
            return `platform/components/${componentName}/${componentName}.js`;
        }
    });
}

function getBehaviours () {
    return [];
}

function getServices (fileContent) {
    // @todo use ngAnnote logic
    var services = fileContent.match(/function \((.*)\)/)[1].replace(/\s/, '').split(',');

    console.log('[injector] services', services);

    var deps = services.map(function (service) {
        var matcher = matchers.find(function (matcher) {
            return service.match(matcher.match);
        });


        var name = snakeCase(service);
        return `${matcher.dir}${name}/${name}.js`;
    });

    console.log('[injector] deps', deps);

    return deps;
}

function analyse (fileName, fileContent) {
    var extension = getExtension(fileName);

    if (extension === 'js') {
        return getServices(fileContent);
    } else if (extension === 'html') {
        return getComponents(fileContent);
    }
}

function analyseFile (fileName) {
    return reader.read(fileName)
        .then(function (fileContent) {
            return analyse(fileName, fileContent);
        });
}

function analyseContent (fileName, fileContent) {
    return new Promise(function (resolve, rejector) {
        resolve(analyse(fileName, fileContent));
    });
}

function inject (deps, res) {
    res.write(deps.map(function (dep) {
        return `<script src="${dep}"></script>`;
    }).join('\n'));
}

module.exports = { analyseFile: analyseFile, analyseContent: analyseContent, inject: inject };
