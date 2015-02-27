(function() {
  'use strict';

  var config  = require('../config.json');
  var gulp    = require('gulp');
  var plugins = require('gulp-load-plugins')();

  // copies user-created files and vendor assets
  gulp.task('copy', function() {
    var displaySize = !!plugins.util.env.verbose ?
        plugins.size :
        plugins.util.noop;

    // everything in the app folder except templates, Sass, and JS
    gulp.src(config.appAssets, {base: 'app/'})
        .pipe(displaySize({showFiles: true}))
        .pipe(gulp.dest('build'));

    // Iconic font
    return gulp.src('bower_components/open-iconic/font/fonts/**/*')
        .pipe(displaySize({showFiles: true}))
        .pipe(gulp.dest('build/assets/fonts'));
  });

}());
