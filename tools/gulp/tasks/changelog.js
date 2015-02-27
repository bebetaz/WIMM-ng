(function() {
  'use strict';

  var config    = require('../config.json');
  var pkg       = require('../../../package.json');
  var gulp      = require('gulp');
  var plugins   = require('gulp-load-plugins')();
  var cp        = require('child_process');
  var changelog = require('conventional-changelog');
  var fs        = require('fs');

  // plugins: (loaded through gulp-load-plugins)
  //  gulp-jshint

  // modules: (other required modules not listed above)
  //  jshint-stylish

  // config:
  //  appJS - these files are for your app's JavaScript

  // get latest tag from master
  function latestTag(done) {
    // get tags sorted by date
    cp.exec('git describe --tags --abbrev=0 master',
      function(err, stdout, stderr) {
        if (err) {
          done('Unable to find last tag!');
        }
        else {
          done(null, String(stdout).trim());
        }
      });
  }

  // generate changelog
  gulp.task('changelog', function() {
    latestTag(function(err, tag) {
      if (err || !tag) {
        console.error(err);
      }
      else {
        changelog({
          repository: pkg.homepage,
          version: pkg.version,
          from: tag
        }, function(err, log) {
          if (err) {
            console.error(err);
          }
          else {
            fs.writeFile('CHANGELOG.md', log, function(err) {
              if (err) {
                console.error(err);
              }
            })
          }
        });
      }
    });
  });

}());
