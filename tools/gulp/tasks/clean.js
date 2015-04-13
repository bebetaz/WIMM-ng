(function() {
  'use strict';

  var gulp = require('gulp');
  var del  = require('del');

  // cleans the build directory
  gulp.task('clean', function() {
    return del('build');
  });

}());
