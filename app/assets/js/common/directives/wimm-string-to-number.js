(function(angular) {
  'use strict';

  angular
    .module('WIMM.common')
    .directive('wimmStringToNumber', wimmStringToNumber);

  function wimmStringToNumber() {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: wimmStringToNumberLink
    };
  }

  function wimmStringToNumberLink(scope, element, attr, ngModel) {
    function parse(value) {
      if (typeof(value) !== 'number') {
        value = parseFloat(value);
      }
      return value;
    }

    function format(value) {
      if (typeof(value) !== 'number') {
        value = parseFloat(value);
      }
      return value;
    }

    ngModel.$parsers.push(parse);
    ngModel.$formatters.push(format);
  }

}(window.angular));
