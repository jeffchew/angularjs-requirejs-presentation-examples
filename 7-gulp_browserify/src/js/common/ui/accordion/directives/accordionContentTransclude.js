"use strict";

(function(){

    /**
     * @ngdoc directive
     * @name accordion.directive:accordionContentTransclude
     * @restrict AE
     * @description
     * Directive for accordionContentTransclude element.
     * Responsible for rendering the transcluded content to the element.
     *
     * @example
     <example>
     <file name="accordion.html">
     <div data-accordion-content></div>
     </file>
     </example>
     *
     */

    angular.module('accordion')
        .directive('accordionContentTransclude', function(){
            return {
                restrict: 'AE',
                require: '^accordionPane',
                link: function(scope, element){
                    /**
                     * Watch the 'contentElement' property and on change, append 'content' element to DOM
                     */
                    scope.$watch('contentElement', function updateContentElement(content) {
                        if (content) {
                            element.html('');
                            element.append(content);
                        }
                    });
                }
            };
        });
})();