/**
 * RegisterController
 */
angular.module('register').controller('RegisterCtrl', function (lang, taxPolicy, salesResource) {

    this.lang = lang;

    this.sale = salesResource.get();

    this.getTotal = function () {
        return taxPolicy(this.sale.amount);
    }

    this.submit = function () {
        salesResource.save(this.sale);
    };

});
