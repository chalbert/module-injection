angular.module('vend').factory('settingsResource', function ($http) {

    return {
        save: function (data) {
            return $http.put('api/settings', data);
        }
    };

});
