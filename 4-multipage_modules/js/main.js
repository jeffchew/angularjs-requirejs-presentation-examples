(function ($w) {

    "use strict";

    require.config({
        "baseUrl": "js/",
        "paths": {
            "text": "vendor/text",
            "jquery": "vendor/jquery",
            "angular": "vendor/angular",
            "angular-animate": "vendor/angular-animate",
            "lodash": "vendor/lodash.min"
        },
        "shim": {
            "angular": {exports: "angular"},
            "angular-animate": {"deps": ["angular"]},
            "jquery": {exports: "$"},
            "lodash": {exports: "_"}
        },
        "waitSeconds": 0
    });

    $w.$myapp = $w.$myapp || {};
    $w.$myapp.deps = $w.$myapp.deps || [];
    $w.$myapp.ngApps = $w.$myapp.ngApps || [];

    $w.$myapp.deps.push('angular');

    require($w.$myapp.deps, function(){
        angular.bootstrap(document, $w.$myapp.ngApps);
    });

})(window);


