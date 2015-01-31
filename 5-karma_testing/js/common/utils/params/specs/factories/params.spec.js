define([
    'jquery',
    'angular',
    'angular-mocks',
    'jasmine-jquery',
    'common/utils/params/app'
], function($) {
    "use strict";

    describe('Params factory:', function() {

        var paramsFactory;

        beforeEach(module('params', function($provide){
            $provide.value('$window', {
                location: {
                    search: '?a=1&b=2&c=3'
                },
                document: window.document
            });

            $provide.value('$document', [{}]);
        }));

        beforeEach(inject(function($injector) {
            paramsFactory = $injector.get('params');
        }));

        it("should return the querystring values as an object", function(){
            var _params = paramsFactory.getParams();
            var expectedObject = {
                a: '1',
                b: '2',
                c: '3'
            };
            expect(_params).toEqual(expectedObject);
        });

        it("should return the string value of the specified querystring parameter", function(){
            var _a = paramsFactory.getParam('a');
            expect(_a).toEqual('1');
        });

    });



});