(function(angular) {
  'use strict';

  angular
    .module('WIMM.common')
    .filter('wimmArtworkUrl', function() { return wimmArtworkUrl; });

  function wimmArtworkUrl(value) {
    var url = '';

    if (value) {
      url = '/image/' + encodeURIComponent(value);
    }

    return url;
  }

}(window.angular));
