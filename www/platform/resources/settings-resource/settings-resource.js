angular.module('vd').factory('settingsResource', function ($http) {
    var SETTINGS_ENDPOINT = 'api/settings';

    return {
        get: function () {
            var settings = {};

            $http.get(SETTINGS_ENDPOINT).then(function (response) {
                angular.extend(settings, response.data)
            });
            
            return settings;
        },
        save: function (data) {
            return $http.put(SETTINGS_ENDPOINT, data);
        }
    };

});
