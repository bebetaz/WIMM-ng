(function(angular) {
  'use strict';

  angular
    .module('WIMM.movies')
    .controller('ListMoviesCtrl', listMoviesCtrl);

  function listMoviesCtrl(CONFIG, $scope, $state, movies) {
    $scope.data = movies;

    $scope.itemsPerPage = CONFIG.PAGE_SIZE;
    $scope.totalItems = movies.limits.total;
    $scope.currentPage = Math.ceil(movies.limits.start / $scope.itemsPerPage) +
      1;
    $scope.numPages = 10;

    $scope.changePage = function(page) {
      $state.go($state.current.name, {page: page});
    };
  }

}(window.angular));
