(function(angular) {
  'use strict';

  angular
    .module('WIMM.common')
    .filter('artworkUrl', function() { return artworkUrl; });

  function artworkUrl(value) {
    var url = '';

    if (value) {
      url = '/image/' + encodeURIComponent(value);
    }

    return url;
  }

}(window.angular));
