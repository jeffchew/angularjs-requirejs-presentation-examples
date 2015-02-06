var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

var $w = window;
$w.$myapp = $w.$myapp || {};
$w.$myapp.deps = $w.$myapp.deps || [
    "angular",
    "angular-mocks",
    "jasmine-jquery"
];

requirejs.config({
    // Karma serves files from '/base'
    "baseUrl": "/base/js",

    "paths": {
        "text": "vendor/text",
        "jquery": "vendor/jquery",
        "angular": "vendor/angular",
        "angular-animate": "vendor/angular-animate",
        "lodash": "vendor/lodash.min",

        //Karma specific
        "angular-mocks": "vendor/angular-mocks",
        "jasmine-jquery": "vendor/jasmine-jquery"
    },
    "shim": {
        "angular": {
            deps: ["jquery"],
            exports: "angular"
        },
        "angular-animate": {"deps": ["angular"]},
        "jquery": {exports: "$"},
        "lodash": {exports: "_"},

        //Karma specific
        "angular-mocks": { deps: ["angular"]},
        "jasmine-jquery": { deps: ["jquery"]}
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    waitSeconds: 8,

    // start test run, once Require.js is done
    callback: function(){
        "use strict";

        require($w.$myapp.deps, function(){
            window.__karma__.start();
        });

    }
});