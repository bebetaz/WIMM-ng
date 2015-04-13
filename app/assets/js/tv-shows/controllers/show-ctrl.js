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

    $scope.saveChanges = function saveChanges(tvshowid, form) {
      var changes = {};
      angular.forEach(form, checkForChanges, changes);

      if (angular.toJson(changes) === '{}') {
        // nothing to save
        form.$setPristine();
        form.$setUntouched();
        return;
      }

      VideoLibraryService.setTVShowDetails(tvshowid, changes)
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
