(function(angular) {
  'use strict';

  angular
    .module('WIMM.common')
    .filter('wimmRemoveArticle', function() { return wimmRemoveArticle; });

  function wimmRemoveArticle(title) {
    title = title || '';

    if (title.substr(0, 4).toLowerCase() === 'the ') {
      title = title.substr(4);
    }

    return title;
  }

}(window.angular));
