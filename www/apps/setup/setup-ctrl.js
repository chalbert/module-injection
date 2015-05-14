/**
 * SetupController
 */
angular.module('setup').controller('SetupCtrl', function (settingsResource) {
    this.settings = settingsResource.get();

    this.submit = function () {
        settingsResource.save(this.settings);
    };

});
