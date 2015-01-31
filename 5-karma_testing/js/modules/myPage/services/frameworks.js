define([],
    function () {
        'use strict';

        /**
         * @ngdoc service
         * @name myPage.frameworksService
         * @description
         * Service to return array of framework information
         */
        return ['$q', function ($q) {

            /**
             * @ngdoc property
             * @name _frameworksContent
             * @propertyOf myPage.frameworksService
             * @description
             * Content to return from the service
             * @returns {object} Frameworks content
             */
            var _frameworksContent = {
                "content": [
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
                ]
            };

            /**
             * @ngdoc method
             * @name getFrameworks
             * @methodOf myPage.frameworksService
             * @description
             * Fetches the frameworks content
             * @returns {object} Frameworks response
             */
            this.getFrameworks = function () {
                var d = $q.defer();

                d.resolve(_frameworksContent);

                return d.promise;
            };

        }];
    });