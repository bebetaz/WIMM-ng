(function(angular) {
  'use strict';

  angular
    .module('WIMM.tvShows')
    .controller('SeasonCtrl', seasonCtrl);

  function seasonCtrl($scope, $stateParams, tvShow, episodes) {
    $scope.tvShow = tvShow.tvshowdetails;
    $scope.season = $stateParams.season;
    $scope.episodes = episodes.episodes;
  }

}(window.angular));
