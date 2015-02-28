'use strict';

require('./../../../myPage');
var accordionData = require('./../data/accordion.json');

(function(){

    var $scope,
        $q,
        $controller,
        $window,
        myPageController,
        frameworksServiceMock;

    describe('myPage controller:', function(){
        function createMockFrameworksService(){
            frameworksServiceMock = {
                getFrameworks: function(){
                    var d = $q.defer();

                    d.resolve(accordionData);

                    return d.promise;
                }
            };

            spyOn(frameworksServiceMock, "getFrameworks").and.callThrough();
        }

        function createController(){
            myPageController = $controller('myPageController', {
                $scope: $scope,
                frameworksService: frameworksServiceMock
            });

            $scope.$digest();
        }

        beforeEach(function(){
            configTest.bootstrapModule("myPage", [
                {
                    name: '$window',
                    data: {
                        location: {},
                        document: window.document
                    }
                }
            ]);
        });

        beforeEach(inject(function($injector) {
            $scope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            $q = $injector.get('$q');
            $window = $injector.get('$window');

            createMockFrameworksService();
        }));

        it("should load the correct accordion data", function(){
            createController();
            expect(frameworksServiceMock.getFrameworks).toHaveBeenCalled();
            expect($scope.accordionContent.length).toBe(4);
        });

    });

})();