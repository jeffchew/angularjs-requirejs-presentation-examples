'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    path = require('path'),
    karma = require('karma').server,
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    glob = require('glob');

gulp.task('default', ['js']);

gulp.task('test', function(done){
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('js', function () {
    var bundler = browserify({
        entries: ['./src/js/index.js'],
        paths: ['./node_modules', './src/js']
    });

    var bundle = function() {
        return bundler
            .bundle()
            .pipe(source('bundled.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./src/js/'));
    };

    return bundle();
});

gulp.task('inject-deps', function () {
    var target = gulp.src('./www/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./www/js/libs/bower/**/*min.js'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./www'));
});