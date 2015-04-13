(function(angular) {
  'use strict';

  angular
    .module('WIMM.common')
    .directive('wimmArrayToList', wimmArrayToList);

  function wimmArrayToList() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: wimmArrayToListLink
    };
  }

  function wimmArrayToListLink(scope, element, attr, ngModel) {
    function parse(value) {
      var array = value.split('\n');
      for (var i = 0, len = array.length; i < len; i++) {
        array[i] = array[i].trim();
      }
      return array;
    }

    function format(value) {
      return value.join('\n');
    }

    ngModel.$parsers.push(parse);
    ngModel.$formatters.push(format);
  }

}(window.angular));
