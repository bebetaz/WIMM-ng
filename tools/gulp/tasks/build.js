(function() {
  'use strict';

  var gulp        = require('gulp');
  var plugins     = require('gulp-load-plugins')();
  var runSequence = require('run-sequence').use(gulp);

  // plugins: (loaded through gulp-load-plugins)
  //  gulp-util

  // builds your entire app once, without starting a server
  gulp.task('build', function() {
    return runSequence(
      'clean',
      ['copy', 'sass', 'uglify:vendor', 'uglify:app', 'translations', 'addon'],
      //'copy-templates',
      function() {
        plugins.util.log('Successfully built.');
      });
  });

}());
