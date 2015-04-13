(function(angular) {
  'use strict';

  angular
    .module('WIMM.tvShows')
    .controller('ListShowsCtrl', listShowsCtrl);

  function listShowsCtrl($scope, tvShows) {
    $scope.data = tvShows;
  }

}(window.angular));
