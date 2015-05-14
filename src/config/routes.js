'use strict';

module.exports = [
    {
        match: /^\/api\//,
        handler: 'api'
    },
    {
        match: /^\/$/,
        link: 'setup'
    },
    {
        match: /^\/bootstrap\//,
        handler: 'bootstrap'
    },
    {
        match: /^\/apps\//,
        handler: 'static',
        dir: ''
    },
    {
        match: /^\/vendor\//,
        handler: 'static',
        dir: 'platform'
    },
    {
        match: /^\/platform\//,
        handler: 'static',
        dir: ''
    },
    {
        match: /^setup/,
        handler: 'app',
        name: 'setup',
        title: 'Setup Page'
    },
];
