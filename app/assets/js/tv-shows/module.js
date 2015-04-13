(function(angular) {
  'use strict';

  angular
    .module('WIMM.tvShows', [
    ])
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('tvShows', {
        url: '/tv-shows',
        templateUrl: 'assets/templates/tv-shows/index.html',
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

  function getShows(VideoLibraryService)
  {
    return VideoLibraryService.getTVShows();
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
