define([
        'angular',
        './controllers/myPageController',
        './services/frameworks',

        'common/ui/accordion/app'
    ],
    function (angular, myPageController, frameworksService) {
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
        App.service('frameworksService', frameworksService);

    });