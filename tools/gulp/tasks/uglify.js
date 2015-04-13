(function() {
  'use strict';

  var config  = require('../config.json');
  var pkg     = require('../../../package.json');
  var gulp    = require('gulp');
  var plugins = require('gulp-load-plugins')();

  // plugins: (loaded through gulp-load-plugins)
  //  gulp-concat
  //  gulp-footer
  //  gulp-ng-annotate
  //  gulp-size
  //  gulp-sourcemaps
  //  gulp-uglify
  //  gulp-util

  // config:
  //  appJS - these files are for your app's JavaScript
  //  appJSOutput
  //  vendorJS - these files are vendor JavaScript
  //  vendorJSOutput

  function importPkgConfig() {
    var vars = JSON.parse(JSON.stringify(pkg)); // cheap clone

    // remove there variables we don't need
    delete vars.devDependencies;
    delete vars.private;

    return '(function(module){try{' +
      'module=angular.module("WIMM")}' +
      'catch(e){module=angular.module("WIMM",[])}' +
      'module.constant("PKG",' + JSON.stringify(vars) + ')}());';
  }

  // compiles and copies the app's JS
  gulp.task('uglify:app', ['lint:app'], function() {
    var displaySize = !!plugins.util.env.verbose ?
        plugins.size :
        plugins.util.noop;

    return gulp
        .src(config.appJS)
        .pipe(displaySize({showFiles: true}))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.footer(importPkgConfig()))
        .pipe(plugins.ngAnnotate({add: true, 'single_quotes': true}))
        .pipe(plugins.uglify({
            mangle: false,
            preserveComments: 'some'
        }).on('error', plugins.util.log))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(displaySize({showFiles: true}))
        .pipe(gulp.dest(config.appJSOutput));
  });

  // compiles and copies the vendor JS
  gulp.task('uglify:vendor', function() {
    var displaySize = !!plugins.util.env.verbose ?
        plugins.size :
        plugins.util.noop;

    return gulp
      .src(config.vendorJS)
      .pipe(displaySize({showFiles: true}))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('vendor.js'))
      .pipe(plugins.uglify({
          mangle: false,
          preserveComments: 'some'
      }).on('error', plugins.util.log))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(displaySize({showFiles: true}))
      .pipe(gulp.dest(config.vendorJSOutput));
  });

}());
