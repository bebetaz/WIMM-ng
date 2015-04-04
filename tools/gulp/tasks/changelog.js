(function() {
  'use strict';

  var pkg       = require('../../../package.json');
  var gulp      = require('gulp');
  var cp        = require('child_process');
  var changelog = require('conventional-changelog');
  var fs        = require('fs');

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
