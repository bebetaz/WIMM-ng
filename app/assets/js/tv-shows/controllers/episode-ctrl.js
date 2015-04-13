(function(angular) {
  'use strict';

  angular
    .module('WIMM.tvShows')
    .controller('EpisodeCtrl', episodeCtrl);

  function episodeCtrl($scope, VideoLibraryService, tvShow, episode) {
    $scope.tvShow = tvShow.tvshowdetails;
    $scope.episode = episode.episodedetails;

    $scope.saveChanges = function saveChanges(episodeid, form) {
      var changes = {};
      angular.forEach(form, checkForChanges, changes);

      if (angular.toJson(changes) === '{}') {
        // nothing to save
        form.$setPristine();
        form.$setUntouched();
        return;
      }

      VideoLibraryService.setEpisodeDetails(episodeid, changes)
        .then(function(result) {
          if (result === 'OK') {
            form.$setSubmitted();
            form.$setPristine();
            form.$setUntouched();
          }
        });
    };
  }

  function checkForChanges(value, fieldName) {
    /*jshint validthis:true */

    if (value && value.$dirty) {
      this[value.$name] = value.$modelValue;
    }
  }

}(window.angular));
