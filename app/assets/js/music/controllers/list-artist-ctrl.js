(function(angular) {
  'use strict';

  angular
    .module('WIMM.music')
    .controller('ListArtistsCtrl', listArtistsCtrl);

  function listArtistsCtrl(CONFIG, $scope, $state, $stateParams, artists) {
    $scope.artists = artists.artists;

    $scope.$parent.sectionTitle = '';
    $scope.itemsPerPage = CONFIG.PAGE_SIZE;
    $scope.totalItems = artists.limits.total;
    $scope.currentPage = Math.ceil(artists.limits.start / $scope.itemsPerPage) +
      1;
    $scope.numPages = 10;

    $scope.changePage = function(page) {
      $state.go($state.current.name, {page: page});
    };
  }

}(window.angular));
