(function() {
  'use strict';

  var config  = require('../config.json');
  var gulp    = require('gulp');
  var plugins = require('gulp-load-plugins')();

  // plugins: (loaded through gulp-load-plugins)
  //  gulp-util

  // config:
  //  appAssets
  //  appJSWatch
  //  sassWatch
  //  tplsWatch

  // default task: builds your app, starts a server, and recompiles assets when they change
  gulp.task('default', ['build', 'server:start'], function() {
    // Watch Sass
    gulp.watch([config.sassWatch], ['sass']);

    // Watch JavaScript
    gulp.watch([config.appJSWatch], ['uglify:app']);

    // Watch static files
    gulp.watch(config.appAssets, ['copy']);

    // Watch app templates
    //gulp.watch([config.tplsWatch], ['copy-templates']);

    plugins.util.log('Watching for changes...');
  });

}());
