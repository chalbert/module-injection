angular.module('vd').factory('taxPolicy', function () {

    return function (amount) {
        return amount * 1.15;
    }

});
