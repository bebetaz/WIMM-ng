(function(angular) {
  'use strict';

  angular
    .module('WIMM.music')
    .controller('AlbumCtrl', albumCtrl);

  function albumCtrl($scope, MusicLibraryService, album, songs) {
    $scope.album = album.albumdetails;
    $scope.songs = songs.songs;

    $scope.saveChanges = function saveChanges(albumid, form) {
      var changes = {};
      angular.forEach(form, checkForChanges, changes);

      if (angular.toJson(changes) === '{}') {
        // nothing to save
        form.$setPristine();
        form.$setUntouched();
        return;
      }

      MusicLibraryService.setAlbumDetails(albumid, changes)
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
