'use strict';

/** @module config-test
 *  @description A configuration module for creating an angular mock module and bootstrapping itself and all dependencies
 */
(function(){

    /**
     * @name configTest
     * @propertyOf config-test
     * @type {object}
     * @description Creates a global object and attaches itself to the window
     * @private
     */
    var configTest = window.configTest || (window.configTest = {});

    /**
     * @name defaultMockDependencies
     * @propertyOf config-test
     * @type {object}
     * @description Sets the default mock dependencies for the app
     * @private
     */
    var defaultMockDependencies = [];

    /**
     * @name _bootstrapMockModule
     * @methodOf config-test
     * @type {function}
     * @param {string} moduleName The module name to be created
     * @param {array} providers An array of provider objects with name of provider and data to be applied
     * @description Creates an angular mock module based on the moduleName passed in
     * @private
     */
    function _bootstrapMockModule(moduleName, providers){
        if(typeof moduleName === 'string'){
            angular.mock.module(moduleName, function($provide){
                if(angular.isArray(providers) && providers.length > 0 ){
                    angular.forEach(providers, function(provider){
                        _setProviders($provide, provider);
                    });
                }
            });
        } else {
            throw Error('Provide a valid module name as a string');
        }
    }

    /**
     * @name _setProviders
     * @methodOf config-test
     * @type {function}
     * @param {function} $provide The $provide method
     * @param {object} provider A provider object with name of provider and data to be applied
     *
     * @description Provides a module with a value
     * @private
     */
    function _setProviders($provide, provider){
        $provide.value(provider.name, provider.data);
    }

    /**
     * @name _bootstrapDependencies
     * @methodOf config-test
     * @type {function}
     * @param {array} dependencies A list of mock modules to be bootstrapped as dependencies
     * @description Iterates a list of dependencies an bootstraps them to the app
     * @private
     */
    function _bootstrapDependencies(dependencies){
        angular.forEach(dependencies, function(dependency){
            _bootstrapMockModule(dependency);
        });
    }

    /**
     * @name bootstrapModule
     * @methodOf config-test
     * @type {function}
     *
     * @param {string}  moduleName The module name being tested
     * @param {Array}   [providers] An array of providers and data to be provided to the module
     *                            Expects an array in the following format:
     *                            [
     *                              {
     *                                  name: 'providerName',
     *                                  data: {...data to apply to provider...}
     *                              }
     *                            ]
     * @param {Array}   [dependencies] A list of mock modules to be bootstrapped as dependencies
     * @param {boolean} [disableDefaultMocks] A flag to disable bootstrapping the default mock modules
     *
     *
     * @description Bootstraps the app module that is being tested, along with all dependencies that should be added to the module
     * @public
     */
    configTest.bootstrapModule = function(moduleName, providers, dependencies, disableDefaultMocks){
        //Add all default mock services first as they will need to override the original modules
        if(!disableDefaultMocks){
            _bootstrapDependencies(defaultMockDependencies);
        }

        //Add any additional mock dependencies needed
        if(angular.isArray(dependencies) && dependencies.length > 0){
            _bootstrapDependencies(dependencies);
        }

        //Create the module being tested
        _bootstrapMockModule(moduleName, providers);
    };

})();