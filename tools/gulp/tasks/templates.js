(function() {
  'use strict';

  var config  = require('../config.json');
  var gulp    = require('gulp');
  var plugins = require('gulp-load-plugins')();
  var path    = require('path');

  // plugins: (loaded through gulp-load-plugins)
  //  gulp-concat
  //  gulp-minify-html
  //  gulp-ng-html2js
  //  gulp-sourcemaps
  //  gulp-uglify
  //  gulp-util

  // config:
  //  appJSOutput
  //  tplsWatch

  // copies your app's page templates
  gulp.task('copy-templates', ['copy'], function() {
    return gulp.src(config.tplsWatch)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.minifyHtml({empty: true, quotes: true, spare: true}))
        .pipe(plugins.ngHtml2js({
          moduleName: function(file) {
            var name = path.relative(
              path.join(process.cwd(), 'app/assets/templates'), file.path);
            var module = path.dirname(name).split(path.sep)[0];
            return 'WIMM' + (module === '.' ? '' : '.' + module);
          },
          rename: function(url) {
            return url
              .replace('assets/templates/', '');
          }
        }))
        .pipe(plugins.concat('app-tpls.js'))
        .pipe(plugins.uglify({
          mangle: false,
          preserveComments: 'some'
        }).on('error', plugins.util.log))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(config.appJSOutput));
  });

}());
