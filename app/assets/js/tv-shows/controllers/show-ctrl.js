(function(angular) {
  'use strict';

  angular
    .module('WIMM.tvShows')
    .controller('ShowCtrl', showCtrl);

  function showCtrl($scope, VideoLibraryService, tvShow, seasons) {
    $scope.tvShow = tvShow.tvshowdetails;
    $scope.seasons = seasons;

    $scope.viewTvDbPage = function viewTvDbPage(id) {
      window.open('http://thetvdb.com/index.php?tab=series&id=' + id,
                  'WIMM.Ext');
    };

    $scope.saveChanges = function saveChanges() {
      VideoLibraryService.setTVShowDetails($scope.tvShow);
    };
  }

}(window.angular));
