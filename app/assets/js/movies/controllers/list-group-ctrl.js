(function(angular) {
  'use strict';

  angular
    .module('WIMM.movies')
    .controller('ListMovieGroupCtrl', listGroupCtrl);

  function listGroupCtrl(CONFIG, $scope, gettext, groups) {
    if (groups.genres) {
      $scope.$parent.sectionTitle = gettext('Genres');
      $scope.groups = groups.genres;
      $scope.link = function(group) {
        return 'movies.genre(' + angular.toJson({genre: group}) + ')';
      };
    }
    else if (groups.sets) {
      $scope.$parent.sectionTitle = gettext('Sets');
      $scope.groups = groups.sets;
      $scope.link = function(group) {
        return 'movies.set(' + angular.toJson({set: group}) + ')';
      };
    }
    else if (groups.tags) {
      $scope.$parent.sectionTitle = gettext('Tags');
      $scope.groups = groups.tags;
      $scope.link = function(group) {
        return 'movies.tag(' + angular.toJson({tag: group}) + ')';
      };
    }
  }

}(window.angular));
