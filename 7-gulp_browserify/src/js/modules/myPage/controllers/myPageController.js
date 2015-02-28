'use strict';
(function () {

    /**
     * @ngdoc object
     * @name myPage.controller:myPageController
     * @description
     * Controller for my awesome page
     */
    angular.module('myPage')
        .controller('myPageController', ['$scope', 'frameworksService', function ($scope, frameworksService) {
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
            $scope.accordionContent = [];

            /**
             * @ngdoc method
             * @name _init
             * @methodOf myPage.controller:myPageController
             * @description
             * Initializes the controller my calling the frameworks service
             * @private
             */
            function _init(){
                frameworksService.getFrameworks().then(function(response){
                    $scope.accordionContent = response.content;
                });
            }

            $scope.$evalAsync(_init);
        }]);

})();