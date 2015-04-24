(function(angular) {
  'use strict';

  angular
    .module('WIMM.music')
    .controller('ArtistCtrl', artistCtrl);

  function artistCtrl($scope, MusicLibraryService, artist, albums) {
    $scope.artist = artist.artistdetails;
    $scope.albums = albums.albums;

    $scope.saveChanges = function saveChanges(artistid, form) {
      var changes = {};
      angular.forEach(form, checkForChanges, changes);

      if (angular.toJson(changes) === '{}') {
        // nothing to save
        form.$setPristine();
        form.$setUntouched();
        return;
      }

      MusicLibraryService.setArtistDetails(artistid, changes)
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
