angular.module('vd').factory('salesResource', function ($http) {
    var SALES_ENDPOINT = 'api/sales';

    return {
        get: function () {
            var sales = {};

            $http.get(SALES_ENDPOINT).then(function (response) {
                angular.extend(sales, response.data)
            });
            
            return sales;
        },
        save: function (data) {
            return $http.put(SALES_ENDPOINT, data);
        }
    };

});
