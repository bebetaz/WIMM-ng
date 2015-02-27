(function() {
  'use strict';

  var config  = require('../config.json');
  var gulp    = require('gulp');
  var plugins = require('gulp-load-plugins')();

  // plugins: (loaded through gulp-load-plugins)
  //  gulp-angular-gettext
  //  gulp-rename
  //  gulp-replace
  //  gulp-sourcemaps
  //  gulp-uglify
  //  gulp-util

  // config:
  //  appTranslations

  // generate translation template file
  gulp.task('pot', function() {
    return gulp
        .src(config.appTranslations)
        .pipe(plugins.angularGettext.extract('template.pot', 'pot'))
        .pipe(plugins.replace(process.cwd(), '.'))
        .pipe(gulp.dest('po'));
  });

  // generate translations bundle
  gulp.task('translations', function() {
    return gulp
        .src('po/**/*.po')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.angularGettext.compile({module: 'WIMM'}))
        .pipe(plugins.uglify({
            mangle: false,
            preserveComments: 'some'
        }).on('error', plugins.util.log))
        .pipe(plugins.rename('app-translations.js'))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('build/assets/js'));
  });

}());
