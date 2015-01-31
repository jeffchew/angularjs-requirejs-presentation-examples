define([],
    function () {
        'use strict';

        /**
         * @ngdoc object
         * @name myPage.controller:myPageController
         * @description
         * Controller for my awesome page
         */
        return ['$scope', function ($scope) {
            /**
             * @ngdoc property
             * @name myAwesomeHeading
             * @propertyOf myPage.controller:myPageController
             * @description
             * Stores the heading for my controller
             *
             * @returns {string} Heading for the controller
             */
            $scope.myAwesomeHeading = 'This is my awesome heading!';

            /**
             * @ngdoc property
             * @name accordionContent
             * @propertyOf myPage.controller:myPageController
             * @description
             * Stores the accordion content to show
             * @returns {object} Content for the accordion
             */
            $scope.accordionContent = [
                {
                    heading: 'AngularJS',
                    description: 'Awesome!!'
                },
                {
                    heading: 'ReactJS',
                    description: 'Meh...'
                },
                {
                    heading: 'Ember',
                    description: "Who's Ember?"
                }
            ];

        }];
    });