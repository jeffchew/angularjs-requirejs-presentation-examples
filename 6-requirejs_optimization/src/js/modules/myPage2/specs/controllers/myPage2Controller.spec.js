define([
    'jquery',
    'angular',
    'angular-mocks',
    'jasmine-jquery',
    'modules/myPage2/app'
], function() {
    "use strict";

    var $scope,
        $controller,
        $window,
        myPage2Controller;

    describe('myPage controller:', function(){

        function createController(){
            myPage2Controller = $controller('myPage2Controller', {
                $scope: $scope
            });

            $scope.$digest();
        }

        beforeEach(module('myPage2', function($provide){
            $provide.value('$window', {
                location: {
                    search: '?queryValue=something'
                },
                document: window.document
            });
        }));

        beforeEach(inject(function($injector) {
            $scope = $injector.get('$rootScope');
            $controller = $injector.get('$controller');
            $window = $injector.get('$window');
        }));

        it("should properly set the queryValue based on the query string", function(){
            createController();
            expect($scope.queryValue).toBe("something");
        });

    });

});