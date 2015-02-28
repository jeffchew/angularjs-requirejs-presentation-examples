'use strict';

require('./../../../myPage2');

(function(){
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

        beforeEach(function(){
            configTest.bootstrapModule("myPage2", [
                {
                    name: '$window',
                    data: {
                        location: {
                            search: '?queryValue=something'
                        },
                        document: window.document
                    }
                }
            ]);
        });

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

})();