define([
        'angular',
        './directives/accordion',
        './directives/accordionPane',
        './directives/accordionHeadingTransclude',
        './directives/accordionContentTransclude',
        './directives/accordionControls',
        './controllers/accordion',

        'angular-animate'
    ],
    function (angular, accordion, accordionPane, accordionHeadingTransclude, accordionContentTransclude, accordionControls, accordionController) {
        'use strict';

        /**
         * @ngdoc object
         * @name accordion
         * @description
         * Angular module that contains the accordion functionality
         */
        var App = angular.module('accordion', ['ngAnimate']).constant('accordionConfig', {
            closeOthers : true
        });

        App.controller('accordionController', accordionController);
        App.directive('accordion', accordion);
        App.directive('accordionPane', accordionPane);
        App.directive('accordionHeadingTransclude', accordionHeadingTransclude);
        App.directive('accordionContentTransclude', accordionContentTransclude);
        App.directive('accordionControls', accordionControls);

    });