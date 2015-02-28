"use strict";

require('./../../../params');

(function(){

    describe('Serialize filter:', function() {

        beforeEach(function(){
            configTest.bootstrapModule("params");
        });

        it('should have a range filter that produces an array of numbers',
            inject(function($filter) {
                var testObj = { a: 1, b: 2, c: "test serialized"};
                var serialized = $filter('serialize')(testObj);
                expect(serialized).toBe('a=1&b=2&c=test%20serialized');
            }));

    });



})();

