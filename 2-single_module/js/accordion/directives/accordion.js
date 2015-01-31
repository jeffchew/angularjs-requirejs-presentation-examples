define([
    'jquery',
    'angular',
    'text!./../templates/accordion.html'
], function($, angular, accordionTemplate){
    "use strict";

    /**
     * @ngdoc directive
     * @name accordion.directive:accordion
     * @restrict AE
     * @description
     * Directive for initializing the accordion and base logic for the accordion as a whole
     *
     * @param {number} desktopDisabled Flag for determining if the accordion should be disabled in desktop view and the breakpoint to disable it (ex: 641 for window >= 641px)
     * @param {string} mobileDisabled Flag for determining if the accordion should be disabled in mobile view and the breakpoint to disable it (ex: 640 for window <= 640px)
     * @param {string} closeOthers Flag for determining if multiple panes can be open at once (true||false)
     * @param {string} autoScroll Flag to determine if the accordion should auto scroll to newly opened accordion page when closeOthers is true (true||false)
     * @param {string} scrollElementOffset The element offset to add to the scroll position when an accordion is opened (ex: #global-nav)
     *
     * @example
     <example>
         <file name="accordion.html">
             <div data-accordion data-desktop-disabled="641" data-mobile-disabled="640" data-auto-scroll="true" data-close-others="true" data-scroll-element-offset="#global-nav">
                <div data-accordion-controls>Optional</div>
                <div data-accordion-pane>
                    <div data-accordion-heading>Heading Content Here</div>
                    <div data-accordion-content>Body Content Here</div>
                </div>
             </div>
         </file>
     </example>
     *
     */

    return function(){
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            template: accordionTemplate,
            controller: 'accordionController',
            scope: {
                'desktopDisabled' : '@',
                'mobileDisabled' : '@',
                'closeOthers' : '@',
                'autoScroll' : '@',
                'scrollElementOffset' : '@'
            },
            link: function(scope, element, attrs, accordionCtrl){

                /**
                 * @ngdoc property
                 * @name autoScroll
                 * @propertyOf accordion.directive:accordion
                 * @description
                 * Storse the value to determine if te page should auto scroll when accordion panes are opened
                 *
                 * @returns {boolean}
                 */
                scope.autoScroll = scope.autoScroll === "true" ? true : false;

                /**
                 * @ngdoc method
                 * @name _init
                 * @methodOf accordion.directive:accordion
                 * @description
                 * Initializes directive
                 *
                 */
                function _init(){
                    if(scope.autoScroll){
                        _watchScrollAccordion();
                    }
                }

                /**
                 * @ngdoc method
                 * @name _watchScrollAccordion
                 * @methodOf accordion.directive:accordion
                 * @description
                 * Watches the scope property 'scrollAccordion' and calls the _scrollAccordion method
                 *
                 * @private
                 */
                function _watchScrollAccordion(){
                    scope.$on("scrollAccordion", function(event, data){
                        _scrollAccordion(data.element);
                    });
                }

                /**
                 * @ngdoc method
                 * @name _scrollAccordion
                 * @methodOf accordion.directive:accordion
                 * @param {jqLite Object|Dom element} openElement Current accordionPane element that is open
                 *
                 * @description
                 * Calculates scroll position of current open accrodion pane and auto scrolls the body to it
                 *
                 */
                function _scrollAccordion(openElement){
                    var openElementOffset = $(openElement).offset().top,
                        scrollElementOffset = accordionCtrl.getScrollElementOffset(),
                        scrollPosition = openElementOffset - scrollElementOffset;

                    $("html,body").animate({
                        scrollTop : scrollPosition
                    }, "slow");
                }

                //Initialize the directive
                _init();
            }
        };
    };
});