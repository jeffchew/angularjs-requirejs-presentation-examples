
module.exports = function(config) {
    "use strict";

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: './../../',

        // frameworks to use
        frameworks: [
            'jasmine',
            'requirejs'
        ],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-requirejs'
        ],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'js/common/**/*.js', included: false},
            {pattern: 'js/modules/**/*.js', included: false},
            {pattern: 'js/vendor/**/*.js', included: false},

            'js/test/test-main.js',

            //fixtures
            {pattern: 'js/common/**/*.html', watched: true, served: true, included: false},
            {pattern: 'js/common/**/*.json', watched: true, served: true, included: false},
            {pattern: 'js/modules/**/*.html', watched: true, served: true, included: false},
            {pattern: 'js/modules/**/*.json', watched: true, served: true, included: false}
        ],

        // list of files to exclude
        exclude: [
            'js/main.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],

        browserDisconnectTimeout : 10000, // default 2000
        browserDisconnectTolerance : 1, // default 0

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout : 60000, //default 60000

        // adjusted to prevent PhantomJS disconnect issues
        browserNoActivityTimeout : 4*60*1000, //default 10000

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
