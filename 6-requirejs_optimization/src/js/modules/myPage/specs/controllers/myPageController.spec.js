define([
    'jquery',
    'angular',
    'text!./../data/accordion.json',
    'angular-mocks',
    'jasmine-jquery',
    'modules/myPage/app'
], function($, angular, accordionData) {
    "use strict";

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

                    d.resolve(JSON.parse(accordionData));

                    return d.promise;
                }
            };

            spyOn(frameworksServiceMock, "getFrameworks").andCallThrough();
        }

        function createController(){
            myPageController = $controller('myPageController', {
                $scope: $scope,
                frameworksService: frameworksServiceMock
            });

            $scope.$digest();
        }

        beforeEach(module('myPage', function($provide){
            $provide.value('$window', {
                location: {},
                document: window.document
            });
        }));

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

});