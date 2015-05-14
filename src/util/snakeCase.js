'use strict';

var SNAKE_CASE_REGEXP = /[A-Z]/g;

module.exports = function snake_case(name, separator) {
    separator = separator || '-';
    return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
        return (pos ? separator : '') + letter.toLowerCase();
    });
};
