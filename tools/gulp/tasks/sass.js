(function() {
  'use strict';

  var config  = require('../config.json');
  var gulp    = require('gulp');
  var plugins = require('gulp-load-plugins')();

  // plugins: (loaded through gulp-load-plugins)
  //  gulp-autoprefixer
  //  gulp-sass
  //  gulp-size
  //  gulp-util

  // config:
  //  sassFile
  //  sassOutput
  //  sassPaths  - sass will check these folders for files when you use @import

  // compiles sass
  gulp.task('sass', function() {
    var production = (plugins.util.env.type === 'production');
    var displaySize = !!plugins.util.env.verbose ?
        plugins.size :
        plugins.util.noop;

    return gulp
        .src(config.sassFile)
        .pipe(displaySize({showFiles: true}))
        .pipe(plugins.sass({
            includePaths: config.sassPaths,
            outputStyle: (production ? 'compressed' : 'nested'),
            sourceComments: !production,
            errLogToConsole: true
        }))
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(config.sassOutput));
  });

}());
