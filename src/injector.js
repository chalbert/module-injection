'use strict';

var db = require('../db/db'),
    reader = require('./reader'),
    snakeCase = require('./util/snakeCase'),
    getExtension = require('./util/getExtension');

var matchers = [
    {
        match: /Resource$/,
        dir: 'platform/resources/'
    },
    {
        match: /^lang$/,
        handler: function() {
            return `platform/languages/${db.settings.lang}/${db.settings.lang}.js`;
        }
    },
    {
        match: /^taxPolicy/,
        handler: function() {
            var dir = 'platform/policies/tax-policies/',
                taxPolicy = db.settings.taxInclusive ? 'inclusive-tax-policy.js' : 'exclusive-tax-policy.js';
            return dir + taxPolicy;
        }
    }
];

function getComponents (fileContent) {
    var components = fileContent.match(/<vd-[^ >]+/g);

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
    var services = fileContent.match(/function \((.*)\)/)[1].replace(/\s/g, '').split(',');

    console.log('[injector] services', services);

    var deps = services.map(function (service) {
        var matcher = matchers.find(function (matcher) {
            return service.match(matcher.match);
        });


        var name = snakeCase(service),
            dir = typeof matcher.dir === 'function' ? matcher.dir(service) : matcher.dir;

        if (matcher.handler) {
            return matcher.handler(service);
        } else {
            return `${dir}${name}/${name}.js`;
        }

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
        return `<script src="${dep}"></script>` + '\n';
    }).join('\n'));
}

module.exports = { analyseFile: analyseFile, analyseContent: analyseContent, inject: inject };
