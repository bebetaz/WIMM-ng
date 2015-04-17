(function(angular) {
  'use strict';

  angular
    .module('WIMM.tvShows', [
    ])
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('tvShows', {
        abstract: true,
        url: '/tv-shows',
        templateUrl: 'assets/templates/tv-shows/index.html'
      })
      .state('tvShows.title', {
        url: '/by-title?page',
        templateUrl: 'assets/templates/tv-shows/show-list.html',
        controller: 'ListShowsCtrl',
        resolve: {
          tvShows: getShows
        }
      })
      .state('tvShows.genres', {
        url: '/by-genre',
        templateUrl: 'assets/templates/tv-shows/group-list.html',
        controller: 'ListShowGroupCtrl',
        resolve: {
          groups: getGenres
        }
      })
      .state('tvShows.genre', {
        url: '/genre/{genre}?page',
        templateUrl: 'assets/templates/tv-shows/show-list.html',
        controller: 'ListShowsCtrl',
        resolve: {
          tvShows: getShows
        }
      })
      .state('tvShows.tags', {
        url: '/by-tag',
        templateUrl: 'assets/templates/tv-shows/group-list.html',
        controller: 'ListShowGroupCtrl',
        resolve: {
          groups: getTags
        }
      })
      .state('tvShows.tag', {
        url: '/tag/{tag}?page',
        templateUrl: 'assets/templates/tv-shows/show-list.html',
        controller: 'ListShowsCtrl',
        resolve: {
          tvShows: getShows
        }
      })
      .state('tvShow', {
        url: '/show-{tvshowid:int}',
        templateUrl: 'assets/templates/tv-shows/show.html',
        controller: 'ShowCtrl',
        resolve: {
          tvShow: getShow,
          seasons: getSeasons
        }
      })
      .state('tvSeason', {
        url: '/show-{tvshowid:int}/season-{season:int}',
        templateUrl: 'assets/templates/tv-shows/season.html',
        controller: 'SeasonCtrl',
        resolve: {
          tvShow: getShow,
          episodes: getEpisodes
        }
      })
      .state('tvEpisode', {
        url: '/show-{tvshowid:int}/season-{season:int}' +
             '/{episodeid:int}-episode-{episode:int}',
        templateUrl: 'assets/templates/tv-shows/episode.html',
        controller: 'EpisodeCtrl',
        resolve: {
          tvShow: getShow,
          episode: getEpisode
        }
      });
  }

  function getShows(CONFIG, VideoLibraryService, $stateParams) {
    var limits = {
      start: CONFIG.PAGE_SIZE * (($stateParams.page || 1) - 1)
    };
    limits.end = limits.start + CONFIG.PAGE_SIZE;

    var filter;
    if ($stateParams) {
      if ($stateParams.genre) {
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

    return VideoLibraryService.getTVShows(filter, limits);
  }

  function getGenres(VideoLibraryService) {
    return VideoLibraryService.getGenres('tvshow');
  }

  function getTags(VideoLibraryService) {
    return VideoLibraryService.getTVShowTags();
  }

  function getShow(VideoLibraryService, $stateParams) {
    return VideoLibraryService.getTVShowDetails($stateParams.tvshowid);
  }

  function getSeasons(VideoLibraryService, $stateParams) {
    return VideoLibraryService.getSeasons($stateParams.tvshowid);
  }

  function getEpisodes(VideoLibraryService, $stateParams) {
    return VideoLibraryService.getEpisodes($stateParams.tvshowid,
                                           $stateParams.season);
  }

  function getEpisode(VideoLibraryService, $stateParams) {
    return VideoLibraryService.getEpisodeDetails($stateParams.tvshowid,
                                                 $stateParams.episodeid);
  }

}(window.angular));
