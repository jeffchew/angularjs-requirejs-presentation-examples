// Karma configuration
// Generated on Thu Jan 15 2015 15:49:25 GMT+0100 (CET)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['browserify', 'jasmine-jquery', 'jasmine'],

        plugins: [
            'karma-jasmine-jquery',
            'karma-browserify',
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],


        // list of files / patterns to load in the browser
        files: [
            './src/js/vendor/jquery.js',
            './src/js/vendor/angular.js',
            './src/js/vendor/angular-mocks.js',
            './src/js/vendor/angular-animate.js',
            './src/js/modules/config-test.js',
            './src/js/modules/**/*.spec.js',
            './src/js/common/**/*.spec.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './src/js/common/**/*.spec.js': ['browserify'],
            './src/js/modules/**/*.spec.js': ['browserify']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout : 60000, //default 60000

        // adjusted to prevent PhantomJS disconnect issues
        browserNoActivityTimeout : 4*60*1000, //default 10000

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
