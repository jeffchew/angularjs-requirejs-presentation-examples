'use strict';
(function () {

    /**
     * @ngdoc object
     * @name params.params
     * @description
     * Factory for fetching elements in the query string parameters
     */
    angular.module('params')
        .factory('params', ['$window', function ($window) {
            return {
                /**
                 * @ngdoc method
                 * @methodOf params.params
                 * @description
                 * Gets the querystring parameters and returns as an object
                 *
                 * @returns {object} Querystring parameters
                 */
                getParams: function () {
                    var query = ($window.location.search || '?').substr(1), map = {};
                    query.replace(/([^&=]+)=?([^&]*)(?:&+|$)/g, function (match, key, value) {
                        if (value !== '' && value !== 'null') {

                            if (value === 'true' || value === 'false') {
                                map[key] = (value === 'true');
                            } else {
                                map[key] = decodeURIComponent(value).replace(/\+/g, " ");
                            }
                        }
                    });

                    return map;
                },

                /**
                 * @ngdoc method
                 * @methodOf params.params
                 * @description
                 * Gets the value of the specified query string variable
                 * @param {string} param Returns the value of the specific parameter value
                 *
                 * @returns {string} Querystring parameter value
                 */
                getParam: function (param) {
                    return this.getParams()[param];
                }
            };
        }]);

})();