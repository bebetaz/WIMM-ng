(function() {
  'use strict';

  var config  = require('../config.json');
  var gulp    = require('gulp');
  var plugins = require('gulp-load-plugins')();

  // plugins: (loaded through gulp-load-plugins)
  //  gulp-jshint

  // modules: (other required modules not listed above)
  //  jshint-stylish

  // config:
  //  appJS - these files are for your app's JavaScript

  // lint application javascript
  gulp.task('lint:app', function() {
    return gulp
        .src(config.appJS)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'));
  });

  gulp.task('lint:jscs', function() {
    return gulp
        .src(config.appJS)
        .pipe(plugins.jscs());
  });

  // lint tools
  gulp.task('lint:tools', function() {
    return gulp
        .src('tools/**/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'));
  });

}());
