angular.module('vd').directive('vdTitle', function () {

    return {
        transclude: true,
        template: `<h1 ng-transclude style="color: #f00"></h1>`
    };

});
