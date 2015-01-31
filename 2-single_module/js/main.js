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

    $w.name = 'NG_DEFER_BOOTSTRAP!';

    require([
        'accordion/app'
    ], function(){
        angular.resumeBootstrap();
    });

})(window);


