(function(angular) {
  'use strict';

  angular
    .module('WIMM.movies', [
    ])
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('movies', {
        url: '/movies',
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

  function getMovies(VideoLibraryService)
  {
    return VideoLibraryService.getMovies();
  }

  function getMovie(VideoLibraryService, $stateParams) {
    return VideoLibraryService.getMovie($stateParams.movieid);
  }

}(window.angular));
