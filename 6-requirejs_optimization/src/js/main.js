(function ($w) {

    "use strict";

    $w.$myapp = $w.$myapp || {};
    $w.$myapp.deps = $w.$myapp.deps || [];
    $w.$myapp.ngApps = $w.$myapp.ngApps || [];

    // initialize/bootstrap the app
    function _init(){
        angular.element(document).ready(function () {
            angular.bootstrap(document, $w.$myapp.ngApps);
        });
    }

    if(typeof(require) !== 'undefined'){
        require.config({
            "baseUrl": "js/",
            "paths": {
                "text": "vendor/text",
                "jquery": "vendor/jquery",
                "angular": "vendor/angular",
                "angular-animate": "vendor/angular-animate",
                "lodash": "vendor/lodash.min.js"
            },
            "shim": {
                "angular": {exports: "angular"},
                "angular-animate": {"deps": ["angular"]},
                "jquery": {exports: "$"},
                "lodash": {exports: "_"}
            },
            "waitSeconds": 0
        });

        $w.$myapp.deps.push('angular');

        require($w.$myapp.deps, _init);
    }else{
        _init();
    }

})(window);


