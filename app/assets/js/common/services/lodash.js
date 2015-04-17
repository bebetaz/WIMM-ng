(function(angular, _) {
  'use strict';

  angular
    .module('WIMM.common')
    .factory('lodash', function() { return _.noConflict(); });

}(window.angular, window._));
