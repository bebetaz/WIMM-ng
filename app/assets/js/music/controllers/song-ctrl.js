(function(angular) {
  'use strict';

  angular
    .module('WIMM.music')
    .controller('SongCtrl', songCtrl);

  function songCtrl($scope, MusicLibraryService, song) {
    $scope.song = song.songdetails;

    $scope.saveChanges = function saveChanges(songid, form) {
      var changes = {};
      angular.forEach(form, checkForChanges, changes);

      if (angular.toJson(changes) === '{}') {
        // nothing to save
        form.$setPristine();
        form.$setUntouched();
        return;
      }

      MusicLibraryService.setSongDetails(songid, changes)
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
