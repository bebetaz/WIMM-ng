(function(angular) {
  'use strict';

  angular
    .module('WIMM.movies', [
    ])
    .config(config);

  function config(gettext, $stateProvider) {
    $stateProvider
      .state('movies', {
        abstract: true,
        url: '/movies',
        templateUrl: 'assets/templates/movies/index.html'
      })
      .state('movies.title', {
        url: '/by-title?page',
        templateUrl: 'assets/templates/movies/movie-list.html',
        controller: 'ListMoviesCtrl',
        resolve: {
          movies: getMovies
        }
      })
      .state('movies.recent', {
        url: '/recently-added?page',
        templateUrl: 'assets/templates/movies/movie-list.html',
        controller: 'ListMoviesCtrl',
        resolve: {
          movies: getRecentlyAdded
        },
        data: {
          sectionTitle: gettext('Recently Added')
        }
      })
      .state('movies.genres', {
        url: '/by-genre',
        templateUrl: 'assets/templates/movies/group-list.html',
        controller: 'ListGroupCtrl',
        resolve: {
          groups: getGenres
        }
      })
      .state('movies.genre', {
        url: '/genre/{genre}?page',
        templateUrl: 'assets/templates/movies/movie-list.html',
        controller: 'ListMoviesCtrl',
        resolve: {
          movies: getMovies
        }
      })
      .state('movies.tags', {
        url: '/by-tag',
        templateUrl: 'assets/templates/movies/group-list.html',
        controller: 'ListGroupCtrl',
        resolve: {
          groups: getTags
        }
      })
      .state('movies.tag', {
        url: '/tag/{tag}?page',
        templateUrl: 'assets/templates/movies/movie-list.html',
        controller: 'ListMoviesCtrl',
        resolve: {
          movies: getMovies
        }
      })
      .state('movies.sets', {
        url: '/by-set',
        templateUrl: 'assets/templates/movies/group-list.html',
        controller: 'ListGroupCtrl',
        resolve: {
          groups: getSets
        }
      })
      .state('movies.set', {
        url: '/set/{set}?page',
        templateUrl: 'assets/templates/movies/movie-list.html',
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

    var filter;
    if ($stateParams) {
      if ($stateParams.set) {
        filter = {
          field: 'set',
          operator: 'is',
          value: $stateParams.set
        };
      }
      else if ($stateParams.genre) {
        filter = {
          field: 'genre',
          operator: 'contains',
          value: $stateParams.genre
        };
      }
      else if ($stateParams.tag) {
        filter = {
          field: 'tag',
          operator: 'contains',
          value: $stateParams.tag
        };
      }
    }

    return VideoLibraryService.getMovies(filter, limits);
  }

  function getRecentlyAdded(CONFIG, VideoLibraryService, $stateParams) {
    var limits = {
      start: CONFIG.PAGE_SIZE * (($stateParams.page || 1) - 1)
    };
    limits.end = limits.start + CONFIG.PAGE_SIZE;

    return VideoLibraryService.getRecentlyAddedMovies(limits);
  }

  function getGenres(VideoLibraryService) {
    return VideoLibraryService.getGenres('movie');
  }

  function getTags(VideoLibraryService) {
    return VideoLibraryService.getMovieTags();
  }

  function getSets(VideoLibraryService) {
    return VideoLibraryService.getMovieSets();
  }

  function getMovie(VideoLibraryService, $stateParams) {
    return VideoLibraryService.getMovieDetails($stateParams.movieid);
  }

}(window.angular));
