'use strict';

var $ = require('jquery');
require('angular');

(function ($w) {
    $w.$myapp = $w.$myapp || {};
    $w.$myapp.ngApps = $w.$myapp.ngApps || [];

    angular.element(document).ready(function () {

        // load modules needed for application
        require('./modules');

        //bootstrap angular app
        angular.bootstrap(document, $w.$myapp.ngApps);

    });
})(window);