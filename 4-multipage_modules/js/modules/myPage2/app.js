define([
        'angular',
        './controllers/myPage2Controller',

        'common/utils/params/app'
    ],
    function (angular, myPage2Controller) {
        'use strict';

        /**
         * @ngdoc object
         * @name myPage2
         * @description
         * Angular module that loads my awesome page
         */
        var App = angular.module('myPage2', [
            'params'
        ]);

        App.controller('myPage2Controller', myPage2Controller);

    });