(function(angular) {
  'use strict';

  angular
    .module('WIMM.movies', [
    ])
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('movies', {
        url: '/movies?page',
        templateUrl: 'assets/templates/movies/index.html',
        controller: 'ListMoviesCtrl',
        resolve: {
          movies: getMovies
        }
      })
      .state('movie', {
        url: '/movie-{movieid:int}',
        templateUrl: 'assets/templates/movies/movie.html',
        controller: 'MovieCtrl',
        resolve: {
          movie: getMovie
        }
      });
  }

  function getMovies(CONFIG, VideoLibraryService, $stateParams) {
    var limits = {
      start: CONFIG.PAGE_SIZE * (($stateParams.page || 1) - 1)
    };
    limits.end = limits.start + CONFIG.PAGE_SIZE;

    return VideoLibraryService.getMovies(undefined, limits);
  }

  function getMovie(VideoLibraryService, $stateParams) {
    return VideoLibraryService.getMovieDetails($stateParams.movieid);
  }

}(window.angular));
