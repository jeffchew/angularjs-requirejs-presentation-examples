"use strict";

require('./../../../params');

(function(){

    describe('Params factory:', function() {

        var paramsFactory;

        beforeEach(function(){
            configTest.bootstrapModule("params", [
                {
                    name: '$window',
                    data: {
                        location: {
                            search: '?a=1&b=2&c=3'
                        },
                        document: window.document
                    }
                },
                {
                    name: '$document',
                    data: [{}]
                }
            ]);
        });

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



})();