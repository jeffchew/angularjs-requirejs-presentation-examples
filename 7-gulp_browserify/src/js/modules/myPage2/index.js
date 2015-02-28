'use strict';

require('./../../common/utils/params');

/**
 * @ngdoc object
 * @name myPage2
 * @description
 * Angular module that loads my awesome page
 */
angular.module('myPage2', [
    'params'
]);

require('./controllers/myPage2Controller');