(function(angular) {
  'use strict';

  angular
    .module('WIMM.tvShows')
    .controller('ListShowGroupCtrl', listGroupCtrl);

  function listGroupCtrl(CONFIG, $scope, gettext, groups) {
    if (groups.genres) {
      $scope.$parent.sectionTitle = gettext('Genres');
      $scope.groups = groups.genres;
      $scope.link = function(group) {
        return 'tvShows.genre(' + angular.toJson({genre: group}) + ')';
      };
    }
    else if (groups.tags) {
      $scope.$parent.sectionTitle = gettext('Tags');
      $scope.groups = groups.tags;
      $scope.link = function(group) {
        return 'tvShows.tag(' + angular.toJson({tag: group}) + ')';
      };
    }
  }

}(window.angular));
