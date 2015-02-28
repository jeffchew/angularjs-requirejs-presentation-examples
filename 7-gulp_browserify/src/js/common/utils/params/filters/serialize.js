'use strict';
(function () {

    /**
     * @ngdoc object
     * @name params.filter:serialize
     * @description
     * Serializes an object to a query string
     * @function
     */
    angular.module('params')
        .filter('serialize', function () {
            return function (obj) {
                var str = [];
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                }

                return str.join("&");
            };
        });

})();