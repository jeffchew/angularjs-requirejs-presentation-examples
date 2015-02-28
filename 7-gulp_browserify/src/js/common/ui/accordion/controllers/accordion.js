'use strict';
(function () {

    /**
     * @ngdoc object
     * @name accordion.controller:accordionController
     * @description
     * Controller for the accordion directive
     */
    angular.module('accordion')
        .controller('accordionController', ['$scope', '$attrs', 'accordionConfig',
            function($scope, $attrs, accordionConfig) {

                /**
                 * @ngdoc property
                 * @name _accordionCtrl
                 * @propertyOf accordion.controller:accordionController
                 * @type {Object} Sets the controller to a private alias
                 *
                 * @private
                 */
                var _accordionCtrl = this;

                /**
                 * @ngdoc property
                 * @name _isNotExpanding
                 * @propertyOf accordion.controller:accordionController
                 * @type {Object} Stores the state of accordions expanding
                 *
                 * @private
                 */
                var _isNotExpanding = true;

                /**
                 * @ngdoc property
                 * @name _accordionCtrl
                 * @propertyOf accordion.controller:accordionController
                 * @type {Array} An collection of all of the accordion panes
                 *
                 * @description
                 * Stores a collection of all to the accordion panes in the accordion
                 */
                _accordionCtrl.panes = [];


                /**
                 * @ngdoc method
                 * @name closeOthers
                 * @methodOf accordion.controller:accordionController
                 * @description
                 * Closes all of the accordion panes that are open, unless closeOthers has been set to false
                 *
                 */
                _accordionCtrl.closeOthers = function(openPane) {
                    if (_accordionCtrl.getCloseOthers() && !_isNotExpanding) {
                        angular.forEach(this.panes, function (pane) {
                            if ( pane !== openPane ) {
                                pane.isOpen = false;
                            }
                        });
                    }
                };


                /**
                 * @ngdoc method
                 * @name scrollAccordion
                 * @methodOf accordion.controller:accordionController
                 * @description
                 * Emits an event on the scope to scroll the accordion to the currently opened pane
                 *
                 */
                _accordionCtrl.scrollAccordion = function(openElement){
                    $scope.$emit("scrollAccordion", {"element": openElement});
                };


                /**
                 * @ngdoc method
                 * @name addPane
                 * @methodOf accordion.controller:accordionController
                 * @description
                 * Adds each accordion pane from the directive to an array to store for
                 * use within the directive and sub-directives.
                 *
                 * When each pane is added, it determines whether the pane should be set to open
                 * on initialization.
                 *
                 * Also adds an event listener for when the pane is 'destroyed' to remove the pane from 'panes'
                 *
                 */
                    // This is called from the accordion-pane directive to add itself to the accordion
                _accordionCtrl.addPane = function(pane) {
                    _accordionCtrl.panes.push(pane);

                    if (pane.openOnLoad) {
                        pane.isOpen = true;
                    } else {
                        pane.isOpen = false;
                    }

                    pane.$on('$destroy', function () {
                        _accordionCtrl.removePane(pane);
                    });
                };

                /**
                 * @ngdoc method
                 * @name removePane
                 * @methodOf accordion.controller:accordionController
                 * @description
                 * Removes the pane from 'panes'
                 *
                 */
                _accordionCtrl.removePane = function(pane) {
                    var index = this.panes.indexOf(pane);
                    if ( index !== -1 ) {
                        _accordionCtrl.panes.splice(index, 1);
                    }
                };


                /**
                 * @ngdoc method
                 * @name getDesktopDisabled
                 * @methodOf accordion.controller:accordionController
                 *
                 * @description
                 * Exposes an API to get the desktopDisabled attribute
                 *
                 * @returns {number} value of attribute if defined, or false if not defined
                 */
                _accordionCtrl.getDesktopDisabled = function(){
                    return $attrs.desktopDisabled ? parseInt($attrs.desktopDisabled, 10) : false;
                };


                /**
                 * @ngdoc method
                 * @name getMobileDisabled
                 * @methodOf accordion.controller:accordionController
                 *
                 * @description
                 * Exposes an API to get the mobileDisabled attribute
                 *
                 * @returns {number} value of attribute if defined, or false if not defined
                 */
                _accordionCtrl.getMobileDisabled = function(){
                    return $attrs.mobileDisabled ? parseInt($attrs.mobileDisabled, 10) : false;
                };


                /**
                 * @ngdoc method
                 * @name getCloseOthers
                 * @methodOf accordion.controller:accordionController
                 *
                 * @description
                 * Exposes an API to get the closeOthers attribute
                 *
                 * @returns {number} value of attribute
                 */
                _accordionCtrl.getCloseOthers = function(){
                    return angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
                };


                /**
                 * @ngdoc method
                 * @name getScrollElementOffset
                 * @methodOf accordion.controller:accordionController
                 *
                 * @description
                 * Exposes an API to get the scrollElementOffset attribute and calculates the offset number
                 *
                 * @returns {number} value of attribute || 0 if scrollElementOffset is not 'fixed' or defined
                 */
                _accordionCtrl.getScrollElementOffset = function(){
                    var $scrollElement = $attrs.scrollElementOffset ? $($attrs.scrollElementOffset) : null;

                    return $scrollElement && $scrollElement.css("position") === "fixed" ? $scrollElement.outerHeight() : 0;
                };

                /**
                 * @ngdoc method
                 * @name expandAll
                 * @methodOf accordion.controller:accordionController
                 * @description
                 * Opens all of the accordion panes
                 *
                 */
                _accordionCtrl.expandAll = function() {
                    _isNotExpanding = true;
                    angular.forEach(this.panes, function (pane) {
                        pane.isOpen = true;
                    });
                };

                /**
                 * @ngdoc method
                 * @name collapseAll
                 * @methodOf accordion.controller:accordionController
                 * @description
                 * Closes all of the accordion panes
                 *
                 */
                _accordionCtrl.collapseAll = function() {
                    angular.forEach(this.panes, function (pane) {
                        pane.isOpen = false;
                    });
                };

                /**
                 * @ngdoc event
                 * @name accordionCollapseAll
                 * @eventOf accordion.controller:accordionController
                 * @description
                 * Event to collapse all accordion panes
                 */
                $scope.$on('accordionCollapseAll', function(event){
                    _accordionCtrl.collapseAll();
                });
            }
        ]);

})();