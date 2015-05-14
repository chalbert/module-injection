/**
 * SetupController
 */
angular.module('setup').controller('SetupCtrl', function (settingsResource) {
    var ctrl = this;

    this.submit = function () {
        settingsResource.save({
            taxInclusive: Boolean(ctrl.taxInclusive)
        });
    }

});
