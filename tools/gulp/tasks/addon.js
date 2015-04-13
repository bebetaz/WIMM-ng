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

  gulp.task('addon.xml', function() {
    var wiext = semver.lt(plugins.util.env.kodi_ver || '0.0.0', '14.9.0') ?
        'xbmc.gui.webinterface' :
        'xbmc.webinterface';

    return gulp
      .src('addon/addon.xml')
      .pipe(plugins.replace('%ADDON_VERSION%', pkg.version))
      .pipe(plugins.replace('%ADDON_WIEXT%', wiext))
      .pipe(gulp.dest('build/webinterface.wimm-ng'));
  });

  gulp.task('addon', ['addon.xml'], function() {
    var displaySize = !!plugins.util.env.verbose ?
        plugins.size :
        plugins.util.noop;

    gulp.src('CHANGELOG.md')
        .pipe(displaySize({showFiles: true}))
        .pipe(gulp.dest('build/webinterface.wimm-ng/changelog.txt'));

    return gulp.src(['addon/fanart.jpg', 'addon/icon.png'])
        .pipe(displaySize({showFiles: true}))
        .pipe(gulp.dest('build/webinterface.wimm-ng'));
  });

}());
