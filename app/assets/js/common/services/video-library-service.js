(function(window, angular) {
  'use strict';

  angular
    .module('WIMM.common')
    .factory('VideoLibraryService', VideoLibraryService);

  function VideoLibraryService($q, $rootScope, $log, $filter, gettext,
    KodiWebSocketService) {
    // We return this object to anything injecting our service
    var Service = {
      ws: KodiWebSocketService
    };

    var tvShowBasicProperties = ['title', 'thumbnail'];
    // Other Fields:
    //   year, cast, episode, fanart, thumbnail, file, watchedepisodes,
    //   dateadded, art
    var tvShowDetailedProperties = ['title', 'genre', 'rating', 'plot',
      'studio', 'mpaa', 'playcount', 'imdbnumber', 'premiered', 'votes',
      'lastplayed', 'originaltitle', 'sorttitle', 'episodeguide', 'tag'];

    // Other Fields:
    //   showtitle, playcount, episode, fanart, thumbnail, tvshowid,
    //   watchedepisodes, art
    var seasonProperties = ['season', 'thumbnail'];

    var episodeBasicProperties = ['title', 'episode', 'thumbnail'];
    // Other Fields:
    // productioncode, fanart, thumbnail, art
    var episodeDetailedProperties = ['title', 'playcount', 'runtime',
      'director', 'plot', 'rating', 'votes', 'lastplayed', 'writer',
      'firstaired', 'season', 'episode', 'originaltitle'];

    /* ---------------------------------------------------------------------- *
     *   TV Show Methods                                                        *
     * ---------------------------------------------------------------------- */

    /**
     * Retrieve all tv shows
     * @public
     * @see [VideoLibrary.GetTVShows]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetTVShows}
     */
    Service.getTVShows = function(filter, limits) {
      var params = {
        properties: tvShowBasicProperties,
        sort: {order: 'ascending', ignorearticle: true, method: 'sorttitle'}
      };

      if (!angular.isUndefined(filter)) {
        params.filter = filter;
      }

      if (!angular.isUndefined(limits)) {
        params.limits = limits;
      }

      var promise = Service.ws.sendCommand('VideoLibrary.GetTVShows', params);
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    /**
     * Retrieve details about a specific tv show
     * @param {number} tvshowid - the id of the tv show to retrieve
     * @private
     * @see [VideoLibrary.GetTVShowDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetMovieDetails}
     */
    Service.getTVShow = function(tvshowid) {
      if (tvshowid < 0) {
        $log.error(
          'kodi.VideoLibraryService#getTVShow: tvshowid must be >= 0.',
          tvshowid);
        return;
      }

      var promise = Service.ws.sendCommand('VideoLibrary.GetTVShowDetails', {
        tvshowid: tvshowid,
        properties: tvShowDetailedProperties
      });
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    /**
     * Retrieve all seasons for a tv show
     * @param {number} tvshowid - the id of the tv show to retrieve
     * @private
     * @see [VideoLibrary.GetSeasons]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetSeasons}
     */
    Service.getSeasons = function(tvshowid) {
      if (tvshowid < 0) {
        $log.error(
          'kodi.VideoLibraryService#getSeasons: tvshowid must be >= 0.',
          tvshowid);
        return;
      }

      var promise = Service.ws.sendCommand('VideoLibrary.GetSeasons', {
        tvshowid: tvshowid,
        properties: seasonProperties
      });
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    /**
     * Retrieve all episodes for a tv show season
     * @param {number} tvshowid - the id of the tv show to retrieve
     * @param {number} season - the season to retrieve
     * @private
     * @see [VideoLibrary.GetEpisodes]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetEpisodes}
     */
    Service.getEpisodes = function(tvshowid, season) {
      if (tvshowid < 0) {
        $log.error(
          'kodi.VideoLibraryService#getSeasons: tvshowid must be >= 0.',
          tvshowid);
        return;
      }

      var promise = Service.ws.sendCommand('VideoLibrary.GetEpisodes', {
        tvshowid: tvshowid,
        season: season,
        properties: episodeBasicProperties
      });
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    /**
     * Retrieve an episode
     * @param {number} tvshowid - the id of the tv show to retrieve
     * @param {number} episode - the episode to retrieve
     * @private
     * @see [VideoLibrary.GetEpisodeDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetEpisodeDetails}
     */
    Service.getEpisode = function(tvshowid, episodeid) {
      if (tvshowid < 0) {
        $log.error(
          'kodi.VideoLibraryService#getSeasons: tvshowid must be >= 0.',
          tvshowid);
        return;
      }

      var promise = Service.ws.sendCommand('VideoLibrary.GetEpisodeDetails', {
        episodeid: episodeid,
        properties: episodeDetailedProperties
      });
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    /**
     * Save details about a specific tv show
     * @param {object} data - the show data
     * @private
     * @see [VideoLibrary.SetTVShowDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.SetTVShowDetails}
     */
    Service.setTVShowDetails = function(data) {
      delete data.label;

      var promise = Service.ws.sendCommand('VideoLibrary.SetTVShowDetails',
                                           data);
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    /**
     * Save details about a specific episode
     * @param {object} data - the episode data
     * @private
     * @see [VideoLibrary.SetEpisodeDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.SetEpisodeDetails}
     */
    Service.setEpisodeDetails = function(data) {
      delete data.label;

      var promise = Service.ws.sendCommand('VideoLibrary.SetEpisodeDetails',
                                           data);
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    return Service;
  }

}(window, window.angular));
