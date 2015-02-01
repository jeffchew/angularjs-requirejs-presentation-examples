module.exports = function(grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-requirejs');

    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {expand: true, cwd: 'src/', src: ['**'], dest: 'build/'}
                ]
            }
        },
        clean: {
            build: ["build"]
        },
        karma: {
            unit: {
                configFile: 'js/test/karma.conf.js'
            }
        },
        requirejs: {
            build: {
                options: {
                    almond: true,
                    "baseUrl": "js",
                    "mainConfigFile": "src/js/main.js",
                    appDir: 'src',
                    dir: 'build',
                    replaceRequireScript: [{
                        files: ['build/index.html','build/index2.html'],
                        module: 'main'
                    }],
                    modules: [
                        {
                            name: 'main',
                            include: [
                                'angular',
                                'jquery',
                                'modules/main'
                            ]
                        }
                    ],
                    "findNestedDependencies": true,
                    "wrapShim": true,
                    "wrap": true,
                    "preserveLicenseComments": false,
                    "optimize": "uglify2",
                    "generateSourceMaps": false
                }
            }
        }
    });

    grunt.registerTask('build-require', ['clean', 'copy:build', 'requirejs:build']);
};
