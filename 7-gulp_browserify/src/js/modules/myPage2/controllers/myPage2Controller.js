'use strict';
(function () {


    /**
     * @ngdoc object
     * @name myPage2.controller:myPage2Controller
     * @description
     * Controller for my awesome page
     */
    angular.module('myPage2')
        .controller('myPage2Controller', ['$scope', 'params', function ($scope, params) {

            /**
             * @ngdoc property
             * @name _params
             * @propertyOf myPage2.controller:myPage2Controller
             * @description
             * Stores the query string params in a private object
             * @returns {Object} Query string params object
             * @private
             */
            var _params = params.getParams();

            /**
             * @ngdoc property
             * @name myAwesomeHeading2
             * @propertyOf myPage2.controller:myPage2Controller
             * @description
             * Stores the heading for my controller
             *
             * @returns {string} Heading for the controller
             */
            $scope.myAwesomeHeading2 = 'This is my second awesome heading!';

            /**
             * @ngdoc property
             * @name queryValue
             * @propertyOf myPage.controller:myPageController
             * @description
             * Stores the query string value in the scope
             * @returns {string} Query string value
             */
            $scope.queryValue = _params.queryValue;

        }]);
})();