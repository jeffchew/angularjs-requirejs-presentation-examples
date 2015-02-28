'use strict';

require('ngAnimate');

/**
 * @ngdoc object
 * @name accordion
 * @description
 * Angular module that contains the accordion functionality
 */
angular.module('accordion', ['ngAnimate']).constant('accordionConfig', {
    closeOthers : true
});

require('./directives/accordion');
require('./directives/accordionPane');
require('./directives/accordionHeadingTransclude');
require('./directives/accordionContentTransclude');
require('./directives/accordionControls');
require('./controllers/accordion');