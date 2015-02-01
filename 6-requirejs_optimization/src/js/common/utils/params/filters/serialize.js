define([],
    function() {
        'use strict';

        /**
         * @ngdoc object
         * @name params.filter:serialize
         * @description
         * Serializes an object to a query string
         * @function
         */
        return function() {
            return function(obj) {
                var str = [];
                for(var p in obj) {
                    if(obj.hasOwnProperty(p)) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                }

                return str.join("&");
            };
        };

    });