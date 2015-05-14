'use strict';

module.exports = [
    {
        match: /^\/$/,
        link: 'setup'
    },
    {
        match: /^setup/,
        handler: 'app',
        name: 'setup',
        title: 'Setup Page'
    },
    {
        match: /^\/bootstrap\//,
        handler: 'bootstrap'
    },
    {
        match: /^\/vendor\//,
        handler: 'static'
    }
];
