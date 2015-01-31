var app = angular.module('myApp', ['ngAnimate']).constant('accordionConfig', {
    closeOthers : true
});

app.controller('accordionController', ['$scope', '$attrs', 'accordionConfig',
    function($scope, $attrs, accordionConfig) {

        var _accordionCtrl = this;
        var _isNotExpanding = true;

        _accordionCtrl.panes = [];

        _accordionCtrl.closeOthers = function(openPane) {
            if (_accordionCtrl.getCloseOthers() && !_isNotExpanding) {
                angular.forEach(this.panes, function (pane) {
                    if ( pane !== openPane ) {
                        pane.isOpen = false;
                    }
                });
            }
        };

        _accordionCtrl.scrollAccordion = function(openElement){
            $scope.$emit("scrollAccordion", {"element": openElement});
        };

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

        _accordionCtrl.removePane = function(pane) {
            var index = this.panes.indexOf(pane);
            if ( index !== -1 ) {
                _accordionCtrl.panes.splice(index, 1);
            }
        };

        _accordionCtrl.getDesktopDisabled = function(){
            return $attrs.desktopDisabled ? parseInt($attrs.desktopDisabled, 10) : false;
        };

        _accordionCtrl.getMobileDisabled = function(){
            return $attrs.mobileDisabled ? parseInt($attrs.mobileDisabled, 10) : false;
        };

        _accordionCtrl.getCloseOthers = function(){
            return angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
        };

        _accordionCtrl.getScrollElementOffset = function(){
            var $scrollElement = $attrs.scrollElementOffset ? $($attrs.scrollElementOffset) : null;

            return $scrollElement && $scrollElement.css("position") === "fixed" ? $scrollElement.outerHeight() : 0;
        };

        _accordionCtrl.expandAll = function() {
            _isNotExpanding = true;
            angular.forEach(this.panes, function (pane) {
                pane.isOpen = true;
            });
        };

        _accordionCtrl.collapseAll = function() {
            angular.forEach(this.panes, function (pane) {
                pane.isOpen = false;
            });
        };

        $scope.$on('accordionCollapseAll', function(event){
            _accordionCtrl.collapseAll();
        });
    }
]);

app.directive('accordion', function(){
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        templateUrl: 'accordion.html',
        controller: 'accordionController',
        scope: {
            'desktopDisabled' : '@',
            'mobileDisabled' : '@',
            'closeOthers' : '@',
            'autoScroll' : '@',
            'scrollElementOffset' : '@'
        },
        link: function(scope, element, attrs, accordionCtrl){

            scope.autoScroll = (scope.autoScroll === "true");

            function _init(){
                if(scope.autoScroll){
                    _watchScrollAccordion();
                }
            }

            function _watchScrollAccordion(){
                scope.$on("scrollAccordion", function(event, data){
                    _scrollAccordion(data.element);
                });
            }

            function _scrollAccordion(openElement){
                var openElementOffset = $(openElement).offset().top,
                    scrollElementOffset = accordionCtrl.getScrollElementOffset(),
                    scrollPosition = openElementOffset - scrollElementOffset;

                $("html,body").animate({
                    scrollTop : scrollPosition
                }, "slow");
            }

            _init();
        }
    };
});

app.directive('accordionContentTransclude', function(){
    return {
        restrict: 'AE',
        require: '^accordionPane',
        link: function(scope, element){
            scope.$watch('contentElement', function updateContentElement(content) {
                if (content) {
                    element.html('');
                    element.append(content);
                }
            });
        }
    };
});

app.directive('accordionControls', function(){
    return {
        restrict: 'AE',
        replace: true,
        require: '^accordion',
        templateUrl: 'accordion-controls.html',
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
});

app.directive('accordionHeadingTransclude', function(){
    return {
        restrict: 'AE',
        require: '^accordionPane',
        link: function(scope, element){
            scope.$watch('headingElement', function updateHeadingElement(heading) {
                if (heading) {
                    element.html('');
                    element.append(heading);
                }
            });
        }
    };
});

app.directive('accordionPane', ['$window', '$location', function($window, $location){
    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        require: '^accordion',
        templateUrl: 'accordion-pane.html',
        scope: {
            'openOnLoad' : '@',
            'category' : '@'
        },
        controller: function(){
            //Empty controller so other directives can require being 'under' a accordionPane
        },
        compile: function(element, attrs, transclude){

            return function postLink(scope, element, attrs, accordionCtrl){

                var $w = $($window);

                var openByDefault = $location.search().section;

                function _init(){
                    _setOpenOnLoad();
                    _watchIsOpen();
                    _addPaneToController();
                    _transcludeContent();
                }

                function _setOpenOnLoad(){
                    if (typeof openByDefault !== 'undefined' && openByDefault === scope.category) {
                        scope.openOnLoad = true;
                    } else if (scope.openOnLoad === 'true') {
                        scope.openOnLoad = true;
                    } else {
                        scope.openOnLoad = false;
                    }
                }

                function isTabHeading(node) {
                    return node.tagName &&  (
                        node.hasAttribute('data-accordion-heading') ||
                        node.hasAttribute('accordion-heading') ||
                        node.tagName.toLowerCase() === 'data-accordion-heading' ||
                        node.tagName.toLowerCase() === 'accordion-heading'
                        );
                }

                function _isDisabled(){
                    var windowWidth = $w.width(),
                        isDesktopDisabled = accordionCtrl.getDesktopDisabled(),
                        isMobileDisabled = accordionCtrl.getMobileDisabled();

                    return (isDesktopDisabled && windowWidth >= isDesktopDisabled) || (isMobileDisabled && windowWidth <= isMobileDisabled);
                }

                function _watchIsOpen(){
                    scope.$watch('isOpen', function(value) {
                        if ( value ) {
                            accordionCtrl.closeOthers(scope);
                        }
                    });
                }

                function _addPaneToController(){
                    accordionCtrl.addPane(scope);
                }

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
}]);



