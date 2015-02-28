'use strict';

/**
 * @ngdoc object
 * @name params
 * @description
 * Angular module that gets the query string parameters. Since $location is unreliable in non-html5 mode, this factory is necessary
 */
var App = angular.module('params', []);

require('./factories/params');
require('./filters/serialize');