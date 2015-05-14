angular.module('vd').directive('vdNav', function () {

    return {
        transclude: true,
        template: `
        <nav style="position: absolute; width: 100px; left:0; top: 0; bottom: 0;">
            <div>
                <a href="/setup">Setup</a>
            </div>
            <div>
                <a href="/register">Register</a>
            </div>
        </nav>
        `
    };

});
