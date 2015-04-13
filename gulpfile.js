(function() {
  'use strict';

  /*
   * gulpfile.js
   * ===========
   * Rather than manage one giant configuration file responsible
   * for creating multiple tasks, each task has been broken out into
   * its own file in tools/gulp/tasks. Any file in that folder gets
   * automatically required by the loop in ./tools/gulp/index.js
   * (required below).
   *
   * To add a new task, simply add a new task file to tools/gulp/tasks.
   */

  require('./tools/gulp');

}());
