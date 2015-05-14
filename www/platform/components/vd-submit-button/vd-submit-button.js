angular.module('vd').directive('vdSubmitButton', function () {

    return {
        transclude: true,
        template: `<button ng-transclude style="background: #0f0"></button>`
    };

});
