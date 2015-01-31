define([
    'jquery',
    'angular',
    'text!./../templates/accordion-controls.html'
], function($, angular, accordionControlsTemplate){
    "use strict";

    /**
     * @ngdoc directive
     * @name accordion.directive:accordionControls
     * @restrict AE
     * @description
     * Directive for individual accordion panes within an accordion
     *
     * @param {boolean} toggle for determining if the accordion pane controller should toggle expand and collapse buttons (true|false)
     *
     * @example
     <example>
     <file name="accordion-controls.html">
     <div data-accordion-controls data-toggle>
     </div>
     </file>
     </example>
     *
     */

    return function(){
        return {
            restrict: 'AE',
            replace: true,
            require: '^accordion',
            template: accordionControlsTemplate,
            scope: {
                "toggle": '=toggle'
            },
            controller: function(){
                //Empty controller so other directives can require being 'under' a accordionPane
            },
            link: function(scope, element, attrs, accordionCtrl){
                scope.isExpanded = scope.toggle ? false : true;

                scope.expandAll = function() {
                    accordionCtrl.expandAll();

                    if(scope.toggle){
                        scope.isExpanded = true;
                    }
                };

                scope.collapseAll = function() {
                    accordionCtrl.collapseAll();

                    if(scope.toggle){
                        scope.isExpanded = false;
                    }
                };
            }
        };
    };
});