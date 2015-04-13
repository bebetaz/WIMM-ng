(function(angular) {
  'use strict';

  angular
    .module('WIMM.movies')
    .controller('ListMoviesCtrl', listMoviesCtrl);

  function listMoviesCtrl($scope, movies) {
    $scope.data = movies;
  }

}(window.angular));
