(function(window, angular) {
  'use strict';

  angular
    .module('WIMM.common')
    .factory('VideoLibraryService', VideoLibraryService);

  function VideoLibraryService($q, $rootScope, $log, $filter, gettext,
    KodiWebSocketService, lodash) {
    // We return this object to anything injecting our service
    var Service = {
      ws: KodiWebSocketService
    };

    var movieBasicProperties = ['title', 'year', 'thumbnail', 'tag'];
    var movieDetailedProperties = [
      'title', 'genre', 'year', 'rating', 'director', 'trailer', 'tagline',
      'plot', 'plotoutline', 'originaltitle', 'lastplayed', 'playcount',
      'writer', 'studio', 'mpaa', 'cast', 'country', 'imdbnumber', 'runtime',
      'set', 'showlink', 'streamdetails', 'top250', 'votes', 'fanart',
      'thumbnail', 'file', 'sorttitle', 'resume', 'dateadded', 'tag',
      'art'
    ];

    var tvShowBasicProperties = ['title', 'thumbnail', 'tag'];
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

    function postLoadCleanUp(value, fieldName) {
      /*jshint validthis:true */

      if (fieldName === 'sorttitle' && (!value || value.length === 0)) {
        this[fieldName] = $filter('wimmRemoveArticle')(this.title);
      }
      else if ((fieldName === 'votes' || fieldName === 'top250') &&
          !angular.isNumber(value)) {
        this[fieldName] = parseInt(value);

        if (isNaN(this[fieldName])) {
          this[fieldName] = value;
          $log.error(gettext('Unable to parse %s as an integer. [%s]'),
            fieldName, value);
        }
      }
      else if (fieldName === 'rating' && !angular.isNumber(value)) {
        this.rating = parseFloat(value);

        if (isNaN(this.rating)) {
          this.rating = value;
          $log.error(gettext('Unable to parse %s as a float. [%s]'),
            fieldName, value);
        }
      }
    }

    function preSaveCleanUp(value, fieldName) {
      /*jshint validthis:true */

      if (fieldName === 'sorttitle' &&
          value &&
          value === $filter('wimmRemoveArticle')(this.title)) {
        this[fieldName] = null;
      }
      else if (fieldName === 'votes') {
        this[fieldName] = value.toString();
      }
      else if (fieldName === 'rating') {
        this[fieldName] = parseFloat(value.toFixed(1));
      }
    }

    /**
     * Retrieve all genres
     * @param {string} type - type of media to retrieve genres for movie, tvshow
     *                        or musicvideo
     * @public
     * @see [VideoLibrary.GetGenres]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetGenres}
     */
    Service.getGenres = function(type) {
      console.assert(type !== undefined,
        'type shoud be either movie, tvshow or musicvideo');

      var promise = Service.ws.sendCommand('VideoLibrary.GetGenres', {
        type: type,
        properties: ['title'],
        sort: {order: 'ascending', ignorearticle: true, method: 'title'}
      });

      return promise;
    };

    /**
     * Retrieve all movie sets
     * @public
     * @see [VideoLibrary.GetMovieSets]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetMovieSets}
     */
    Service.getMovieSets = function() {
      var promise = Service.ws.sendCommand('VideoLibrary.GetMovieSets', {
        properties: ['title'],
        sort: {order: 'ascending', ignorearticle: true, method: 'title'}
      });

      return promise;
    };

    /**
     * Retrieve all movie tags
     * @public
     */
    Service.getMovieTags = function() {
      var promise =  Service
        .getMovies({field: 'tag', operator: 'greaterthan', value: '0'})
        .then(angular.bind(this,
          function getTagsResult(result) {
            var tags = [];
            var groups = [];
            var movie;

            for (var i = 0, iLen = result.movies.length; i < iLen; i++) {
              movie = result.movies[i];

              if (angular.isArray(movie.tag)) {
                for (var j = 0, jLen = movie.tag.length; j < jLen; j++) {
                  if (!lodash.contains(tags, movie.tag[j])) {
                    tags.push(movie.tag[j]);
                    groups.push({title: movie.tag[j]});
                  }
                }
              }
            }

            return {
              tags: groups,
              limits: {
                start: 0,
                end: groups.length,
                total: groups.length
              }
            };
          }));

      return promise;
    };

    /* ---------------------------------------------------------------------- *
     *   Movie Methods                                                        *
     * ---------------------------------------------------------------------- */

    /**
     * Retrieve all movies
     * @public
     * @see [VideoLibrary.GetMovies]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetMovies}
     */
    Service.getMovies = function(filter, limits) {
      var params = {
        properties: movieBasicProperties,
        sort: {order: 'ascending', ignorearticle: true, method: 'sorttitle'}
      };

      if (!angular.isUndefined(filter)) {
        params.filter = filter;
      }

      if (!angular.isUndefined(limits)) {
        params.limits = limits;
      }

      var promise = Service.ws.sendCommand('VideoLibrary.GetMovies', params);
      var defer = $q.defer();

      promise.then(
        function(result) {
          if (result.movies) {
            for (var i = 0; i < result.movies.length; i++) {
              angular
                .forEach(result.movies[i], postLoadCleanUp, result.movies[i]);
            }
          }
          else {
            result.movies = [];
          }

          defer.resolve(result);
        },
        function(error) {
          defer.reject(error);
        }
      );

      return defer.promise;
    };

    /**
     * Retrieve details about a specific movie
     * @param {number} movieid - the id of the movie to retrieve
     * @private
     * @see [VideoLibrary.GetMovieDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetMovieDetails}
     */
    Service.getMovieDetails = function(movieid) {
      if (movieid < 0) {
        $log.error(
          'kodi.VideoLibraryService#getMovie: movieid must be >= 0.',
          movieid);
        return;
      }

      var promise = Service.ws.sendCommand('VideoLibrary.GetMovieDetails', {
        movieid: movieid,
        properties: movieDetailedProperties
      });

      var defer = $q.defer();
      promise.then(
        function(result) {
          angular
            .forEach(result.moviedetails, postLoadCleanUp, result.moviedetails);
          defer.resolve(result);
        },
        function(error) {
          defer.reject(error);
        }
      );

      return defer.promise;
    };

    /**
     * Update a movies details
     * @param {number} movieid - the id of the movie to update
     * @param {Object} updates - an object containing the updated fields
     * @public
     * @see [VideoLibrary.SetMovieDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.SetMovieDetails}
     */
    Service.setMovieDetails = function(movieid, updates) {
      angular.forEach(updates, preSaveCleanUp, updates);
      updates.movieid = movieid;

      var promise = Service.ws.sendCommand('VideoLibrary.SetMovieDetails',
        updates);
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    /**
     * Retrieve recently added movies
     * @public
     * @see [VideoLibrary.GetRecentlyAddedMovies]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetRecentlyAddedMovies}
     */
    Service.getRecentlyAddedMovies = function(limits) {
      var params = {
        properties: movieBasicProperties,
        sort: {order: 'descending', ignorearticle: true, method: 'dateadded'}
      };

      if (!angular.isUndefined(limits)) {
        params.limits = limits;
      }

      var promise = Service.ws
        .sendCommand('VideoLibrary.GetRecentlyAddedMovies', params);
      var defer = $q.defer();

      promise.then(
        function(result) {
          if (result.movies) {
            for (var i = 0; i < result.movies.length; i++) {
              angular
                .forEach(result.movies[i], postLoadCleanUp, result.movies[i]);
            }
          }
          else {
            result.movies = [];
          }

          defer.resolve(result);
        },
        function(error) {
          defer.reject(error);
        }
      );

      return defer.promise;
    };

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
      var defer = $q.defer();

      promise.then(
        function(result) {
          if (result.tvshows) {
            for (var i = 0; i < result.tvshows.length; i++) {
              angular
                .forEach(result.tvshows[i], postLoadCleanUp, result.tvshows[i]);
            }
          }
          else {
            result.tvshows = [];
          }

          defer.resolve(result);
        },
        function(error) {
          defer.reject(error);
        }
      );

      return defer.promise;
    };

    /**
     * Retrieve details about a specific tv show
     * @param {number} tvshowid - the id of the tv show to retrieve
     * @private
     * @see [VideoLibrary.GetTVShowDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetMovieDetails}
     */
    Service.getTVShowDetails = function(tvshowid) {
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
      var defer = $q.defer();

      promise.then(
        function(result) {
          angular
            .forEach(result.tvshowdetails, postLoadCleanUp,
                     result.tvshowdetails);
          defer.resolve(result);
        },
        function(error) {
          defer.reject(error);
        }
      );

      return defer.promise;
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
      var defer = $q.defer();

      promise.then(
        function(result) {
          if (result.episodes) {
            for (var i = 0; i < result.episodes.length; i++) {
              angular
                .forEach(result.episodes[i], postLoadCleanUp,
                         result.episodes[i]);
            }
          }
          else {
            result.episodes = [];
          }

          defer.resolve(result);
        },
        function(error) {
          defer.reject(error);
        }
      );

      return defer.promise;
    };

    /**
     * Retrieve an episode
     * @param {number} tvshowid - the id of the tv show to retrieve
     * @param {number} episode - the episode to retrieve
     * @private
     * @see [VideoLibrary.GetEpisodeDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.GetEpisodeDetails}
     */
    Service.getEpisodeDetails = function(tvshowid, episodeid) {
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
      var defer = $q.defer();

      promise.then(
        function(result) {
          angular
            .forEach(result.episodedetails, postLoadCleanUp,
                     result.episodedetails);
          defer.resolve(result);
        },
        function(error) {
          defer.reject(error);
        }
      );

      return defer.promise;
    };

    /**
     * Save details about a specific tv show
     * @param {object} data - the show data
     * @private
     * @see [VideoLibrary.SetTVShowDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#VideoLibrary.SetTVShowDetails}
     */
    Service.setTVShowDetails = function(tvshowid, updates) {
      angular.forEach(updates, preSaveCleanUp, updates);
      updates.tvshowid = tvshowid;

      var promise = Service.ws.sendCommand('VideoLibrary.SetTVShowDetails',
                                           updates);
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
    Service.setEpisodeDetails = function(episodeid, updates) {
      angular.forEach(updates, preSaveCleanUp, updates);
      updates.episodeid = episodeid;

      var promise = Service.ws.sendCommand('VideoLibrary.SetEpisodeDetails',
                                           updates);
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    /**
     * Retrieve all tv show tags
     * @public
     */
    Service.getTVShowTags = function() {
      var promise =  Service
        .getTVShows({field: 'tag', operator: 'greaterthan', value: '0'})
        .then(angular.bind(this,
          function getTagsResult(result) {
            var tags = [];
            var groups = [];
            var show;

            for (var i = 0, iLen = result.tvshows.length; i < iLen; i++) {
              show = result.tvshows[i];

              if (angular.isArray(show.tag)) {
                for (var j = 0, jLen = show.tag.length; j < jLen; j++) {
                  if (!lodash.contains(tags, show.tag[j])) {
                    tags.push(show.tag[j]);
                    groups.push({title: show.tag[j]});
                  }
                }
              }
            }

            return {
              tags: groups,
              limits: {
                start: 0,
                end: groups.length,
                total: groups.length
              }
            };
          }));

      return promise;
    };

    return Service;
  }

}(window, window.angular));
