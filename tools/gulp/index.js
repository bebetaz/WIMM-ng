(function() {
  'use strict';

  var requireDir = require('require-dir');

  // Require all tasks in tools/gulp/tasks, including subfolders
  requireDir('./tasks', {recurse: true});

}());
