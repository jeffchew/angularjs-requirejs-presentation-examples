'use strict';
(function () {

    /**
     * @ngdoc directive
     * @name accordion.directive:accordionHeadingTransclude
     * @restrict AE
     * @description
     * Directive for accordionHeadingTransclude element.
     * Responsible for rendering the transcluded content to the element.
     *
     * @example
     <example>
         <file name="accordion.html">
            <div data-accordion-heading></div>
         </file>
     </example>
     *
     */

    angular.module('accordion')
        .directive('accordionHeadingTransclude', function () {
            return {
                restrict: 'AE',
                require: '^accordionPane',
                link: function (scope, element) {
                    /**
                     * Watch the 'headingElement' property and on change, append 'heading' element to DOM
                     */
                    scope.$watch('headingElement', function updateHeadingElement(heading) {
                        if (heading) {
                            element.html('');
                            element.append(heading);
                        }
                    });
                }
            };
        });
})();