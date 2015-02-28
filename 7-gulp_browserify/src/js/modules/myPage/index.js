'use strict';

require('./../../common/ui/accordion');

/**
 * @ngdoc object
 * @name myPage
 * @description
 * Angular module that loads my awesome page
 */
angular.module('myPage', [
    'accordion'
]);

require('./controllers/myPageController');
require('./services/frameworks');