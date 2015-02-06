module.exports = function(grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'js/test/karma.conf.js'
            },
            browserstack: {
                configFile: 'js/test/karma.browserstack.conf.js'
            }
        }
    });

};
