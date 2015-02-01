define([
    'jquery',
    'angular',
    'text!./../templates/accordion-pane.html'
], function($, angular, accordionPaneTemplate){
    "use strict";

    /**
     * @ngdoc directive
     * @name accordion.directive:accordionPane
     * @restrict AE
     * @description
     * Directive for individual accordion panes within an accordion
     *
     * @param {boolean} openOnLoad Flag for determining if the accordion pane should be active on load (true|false)
     * @param {string} category Identifier for opening an accordion pane on load with a url hash parameter (url hash example "#?section=categoryValue)
     *
     * @example
     <example>
         <file name="accordion.html">
             <div data-accordion-pane>
                 <div data-accordion-heading>
                    Heading Example 1
                 </div>
                 <div data-accordion-content>
                    Content Example 1
                 </div>
             </div>
         </file>
     </example>
     *
     */

    return ['$window', '$location', function($window, $location){
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            require: '^accordion',
            template: accordionPaneTemplate,
            scope: {
                'openOnLoad' : '@',
                'category' : '@'
            },
            controller: function(){
                //Empty controller so other directives can require being 'under' a accordionPane
            },
            compile: function(element, attrs, transclude){

                return function postLink(scope, element, attrs, accordionCtrl){

                    /**
                     * @ngdoc property
                     * @name $w
                     * @propertyOf accordion.directive:accordionPane
                     * @description
                     * Stores a cached jQuery selector for the angular 'window' element
                     *
                     * @returns {object} $window object
                     * @private
                     */
                    var $w = $($window);

                    /**
                     * @ngdoc property
                     * @name openByDefault
                     * @propertyOf accordion.directive:accordionPane
                     * @description
                     * Stores an object of 'section' hash parameters in url
                     *
                     * @returns {object}
                     * @private
                     */
                    var openByDefault = $location.search().section;

                    /**
                     * @ngdoc method
                     * @name _init
                     * @methodOf accordion.directive:accordionPane
                     * @description
                     * Initializes directive
                     *
                     */
                    function _init(){
                        _setOpenOnLoad();
                        _watchIsOpen();
                        _addPaneToController();
                        _transcludeContent();
                    }

                    /**
                     * @ngdoc method
                     * @name _setOpenOnLoad
                     * @methodOf accordion.directive:accordionPane
                     * @description
                     * Checks to see if openByDefault object is populated and if the
                     * current accordion pane's category matches the value.
                     * If so, it will set the opOnLoad property to true
                     *
                     */
                    function _setOpenOnLoad(){
                        if (typeof openByDefault !== 'undefined' && openByDefault === scope.category) {
                            scope.openOnLoad = true;
                        } else if (scope.openOnLoad === 'true') {
                            scope.openOnLoad = true;
                        } else {
                            scope.openOnLoad = false;
                        }
                    }

                    /**
                     * @ngdoc method
                     * @name isTabHeading
                     * @methodOf accordion.directive:accordionPane
                     * @description
                     * Checks to see if the dom node is the heading element
                     *
                     * @returns {boolean}
                     */
                    function isTabHeading(node) {
                        return node.tagName &&  (
                            node.hasAttribute('data-accordion-heading') ||
                            node.hasAttribute('accordion-heading') ||
                            node.tagName.toLowerCase() === 'data-accordion-heading' ||
                            node.tagName.toLowerCase() === 'accordion-heading'
                            );
                    }

                    /**
                     * @ngdoc method
                     * @name _isDisabled
                     * @methodOf accordion.directive:accordionPane
                     * @description
                     * Checks the to see if the accordion is disabled at the browser's window width
                     *
                     * @returns {boolean}
                     * @private
                     */
                    function _isDisabled(){
                        var windowWidth = $w.width(),
                            isDesktopDisabled = accordionCtrl.getDesktopDisabled(),
                            isMobileDisabled = accordionCtrl.getMobileDisabled();

                        return (isDesktopDisabled && windowWidth >= isDesktopDisabled) || (isMobileDisabled && windowWidth <= isMobileDisabled);
                    }

                    /**
                     * @ngdoc method
                     * @name _watchIsOpen
                     * @methodOf accordion.directive:accordionPane
                     * @description
                     * Watches the scope property 'isOpen' and calls the controller to close all other open accrodions
                     *
                     * @returns {boolean}
                     * @private
                     */
                    function _watchIsOpen(){
                        scope.$watch('isOpen', function(value) {
                            if ( value ) {
                                accordionCtrl.closeOthers(scope);
                            }
                        });
                    }

                    /**
                     * @ngdoc method
                     * @name _addPaneToController
                     * @methodOf accordion.directive:accordionPane
                     * @description
                     * Adds accordionPane to controllers list of all panes
                     *
                     * @private
                     */
                    function _addPaneToController(){
                        accordionCtrl.addPane(scope);
                    }

                    /**
                     * @ngdoc method
                     * @name _transcludeContent
                     * @methodOf accordion.directive:accordionPane
                     * @description
                     * Transcludes and adds the header and content elements the accordionPane scope,
                     * to be used in the transclude directives to render the elements
                     *
                     * @private
                     */
                    function _transcludeContent(){
                        //Stores the parentScope so that the transcluded content retains its scope.
                        var parentScope;

                        //If the tabs are being built with ng-repeat, use that scope, otherwise use the controller scope.
                        if (scope.$parent.hasOwnProperty('$index')) {
                            parentScope = scope.$parent;
                        } else {
                            parentScope = scope.$parent.$parent;
                        }

                        //Transclude the content
                        transclude(parentScope, function(contents) {
                            angular.forEach(contents, function(node) {
                                if(node.nodeType === 1){
                                    if(isTabHeading(node)){
                                        scope.headingElement = node;
                                    } else {
                                        scope.contentElement = node;
                                    }
                                }
                            });
                        });
                    }

                    /**
                     * @ngdoc method
                     * @name toggleOpen
                     * @methodOf accordion.directive:accordionPane
                     * @description
                     * Toggles the isOpen property if the tab is not disabled.
                     *
                     * Calls scrollAccordion method in the controller if the pane is not disabled,
                     * open and closing other tabs is enabled.
                     *
                     */
                    scope.toggleOpen = function() {
                        if (!_isDisabled()) {
                            scope.isOpen = !scope.isOpen;
                        }

                        if(scope.isOpen && !_isDisabled() && accordionCtrl.getCloseOthers()){
                           accordionCtrl.scrollAccordion(element);
                        }
                    };


                    //Initialize the directive
                    _init();


                };
            }
        };
    }];
});