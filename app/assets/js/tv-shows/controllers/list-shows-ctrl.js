(function(angular) {
  'use strict';

  angular
    .module('WIMM.tvShows')
    .controller('ListShowsCtrl', listShowsCtrl);

  function listShowsCtrl(CONFIG, $scope, $state, tvShows) {
    $scope.data = tvShows;

    $scope.itemsPerPage = CONFIG.PAGE_SIZE;
    $scope.totalItems = tvShows.limits.total;
    $scope.currentPage = Math.ceil(tvShows.limits.start / $scope.itemsPerPage) +
      1;
    $scope.numPages = 10;

    $scope.changePage = function(page) {
      $state.go($state.current.name, {page: page});
    };
  }

}(window.angular));
