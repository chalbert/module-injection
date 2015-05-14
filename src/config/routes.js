'use strict';

module.exports = [
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
        match: /^setup/,
        handler: 'app',
        name: 'setup',
        title: 'Setup Page'
    },
];
