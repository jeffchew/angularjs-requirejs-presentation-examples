define([
        'angular',
        './controllers/myPageController',

        'common/ui/accordion/app'
    ],
    function (angular, myPageController) {
        'use strict';

        /**
         * @ngdoc object
         * @name myPage
         * @description
         * Angular module that loads my awesome page
         */
        var App = angular.module('myPage', [
            'accordion'
        ]);

        App.controller('myPageController', myPageController);

    });