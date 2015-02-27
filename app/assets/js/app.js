(function(angular, $, FastClick) {
  'use strict';

  angular
    .module('WIMM', [
      'ui.router',
      'ngAnimate',
      'gettext',

      // angular-foundation
      'mm.foundation'
    ])
    .config(config)
    .run(run)
    .controller('AppCtrl', appCtrl);

  function config($urlRouterProvider, $stateProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/movies');

    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'assets/templates/about.html'
      })
      .state('movies', {
        url: '/movies',
        templateUrl: 'assets/templates/movies/index.html'
      })
      .state('tvShows', {
        url: '/tv-shows',
        templateUrl: 'assets/templates/tv-shows/index.html'
      })
      .state('musicVideos', {
        url: '/music-videos',
        templateUrl: 'assets/templates/music-videos/index.html'
      })
      .state('music', {
        url: '/music',
        templateUrl: 'assets/templates/music/index.html'
      });

    // NOTE: Don't enable $locationProvider.html5Mode. This requires a
    //       little magic on the server side which we can't do with
    //       Kodi as its not a real web server.
    //
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run(gettextCatalog) {
    FastClick.attach(document.body);

    gettextCatalog.setCurrentLanguage('en_GB');
    //gettextCatalog.debug = true;
  }

  function appCtrl(PKG, $rootScope, $scope, $log, gettext) {
    $scope.PKG = PKG;
    $scope.version = PKG.version;
    $scope.kodiVersion = gettext('not connected');
    $scope.kodiVersionExtra = '';
    $scope.apiVersion = gettext('not connected');
    $scope.connected = false;

    $scope.init = function() {
      $log.log('Thunderbirds are go!');
    };

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        $('#loading-screen').addClass('show');
      });

    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        $('#loading-screen').removeClass('show');
      });

    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error) {
        event.preventDefault();
        $log.log(error);
      });
  }

}(window.angular, window.jQuery, window.FastClick));
