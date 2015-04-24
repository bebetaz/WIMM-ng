(function(angular) {
  'use strict';

  angular
    .module('WIMM.movies')
    .controller('MovieCtrl', movieCtrl);

  function movieCtrl($scope, VideoLibraryService, movie) {
    $scope.movie = movie.moviedetails;

    $scope.viewIMDbPage = function viewIMDbPage(id) {
      window.open('http://www.imdb.com/title/' + id + '/',
                  'WIMM.Ext');
    };

    $scope.saveChanges = function saveChanges(movieid, form) {
      var changes = {};
      angular.forEach(form, checkForChanges, changes);

      if (angular.toJson(changes) === '{}') {
        // nothing to save
        form.$setPristine();
        form.$setUntouched();
        return;
      }

      VideoLibraryService.setMovieDetails(movieid, changes)
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
