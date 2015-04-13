(function(angular) {
  'use strict';

  angular
    .module('WIMM.common')
    .directive('wimmConvertDate', wimmConvertDate);

  function wimmConvertDate() {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: wimmConvertDateLink
    };
  }

  function wimmConvertDateLink(scope, element, attr, ngModel) {
    function parse(dt) {
      return dt.toISOString().substr(0, 10);
    }

    function format(text) {
      var parts = text.split('-');
      var dt = new Date(parts[0], parts[1]-1, parts[2]);
      return dt;
    }

    ngModel.$parsers.push(parse);
    ngModel.$formatters.push(format);
  }

}(window.angular));
