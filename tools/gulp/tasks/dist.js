(function() {
  'use strict';

  var gulp        = require('gulp');
  var plugins     = require('gulp-load-plugins')();
  var pkg         = require('../../../package.json');
  var semver      = require('semver');

  // plugins: (loaded through gulp-load-plugins)
  //  gulp-replace
  //  gulp-size
  //  gulp-util
  //  gulp-zip

  gulp.task('dist', ['addon'], function() {
    var suffix = semver.lt(plugins.util.env.kodi_ver || '0.0.0', '14.9.0') ?
        '' :
        '-isengard';

    var displaySize = !!plugins.util.env.verbose ?
        plugins.size :
        plugins.util.noop;

    return gulp.src('build/**/*')
        .pipe(displaySize({showFiles: true}))
        .pipe(plugins.zip(pkg.name + '-' +
                          pkg.version +
                          suffix +'.zip'))
        .pipe(gulp.dest('dist'));
  });

}());
