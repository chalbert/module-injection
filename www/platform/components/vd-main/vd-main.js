angular.module('vd').directive('vdMain', function () {

    return {
        transclude: true,
        template: `
        <main ng-transclude style="display: block; position: absolute; left:100px; top: 0; bottom: 0;"></main>
        `
    };

});
