(function() {
  'use strict';

  var gulp       = require('gulp');
  var plugins    = require('gulp-load-plugins')();
  var modRewrite = require('connect-modrewrite');

  // plugins: (loaded through gulp-load-plugins)
  //  gulp-connect

  // starts a test server, which you can view at http://localhost:8080
  gulp.task('server:start', function() {
    plugins.connect.server({
      root: './build/webinterface.wimm-ng',
      middleware: function() {
        return [
          modRewrite(['^[^\\.]*$ /index.html [L]'])
        ];
      },
    });
  });

}());
