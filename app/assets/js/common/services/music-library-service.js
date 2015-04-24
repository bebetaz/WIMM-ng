(function(window, angular) {
  'use strict';

  angular
    .module('WIMM.common')
    .factory('MusicLibraryService', MusicLibraryService);

  function MusicLibraryService($q, $rootScope, $log, $filter, gettext,
    KodiWebSocketService) {
    // We return this object to anything injecting our service
    var Service = {
      ws: KodiWebSocketService
    };

    var artistBasicProperties = ['thumbnail'];
    var artistDetailedProperties = [
      'instrument', 'style', 'mood', 'born', 'formed', 'description',
      'genre', 'died', 'disbanded', 'yearsactive'
    ];

    var albumBasicProperties = ['title', 'thumbnail'];
    var albumDetailedProperties = [
      'title', 'artist', 'description', 'genre', 'theme', 'mood', 'style',
      'type', 'albumlabel', 'rating', 'year'
    ];

    var songBasicProperties = ['track', 'title', 'duration'];
    var songDetailedProperties = [
      'title', 'artist', 'albumartist', 'genre', 'year', 'rating', 'album',
      'track', 'disc', 'duration', 'comment', 'musicbrainztrackid',
      'musicbrainzartistid', 'musicbrainzalbumid', 'musicbrainzalbumartistid'
    ];

    function postLoadCleanUp(value, fieldName) {
      /*jshint validthis:true */

      if (fieldName === 'rating' && !angular.isNumber(value)) {
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

      if (fieldName === 'rating') {
        this[fieldName] = parseFloat(value.toFixed(1));
      }
    }

    /* ---------------------------------------------------------------------- *
     *   Artist Methods                                                        *
     * ---------------------------------------------------------------------- */

    /**
     * Retrieve all artists
     * @public
     * @see [VideoLibrary.GetArtists]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#AudioLibrary.GetArtists}
     */
    Service.getArtists = function(filter, limits) {
      var params = {
        properties: artistBasicProperties,
        sort: {order: 'ascending', ignorearticle: true, method: 'artist'}
      };

      if (!angular.isUndefined(filter)) {
        params.filter = filter;
      }

      if (!angular.isUndefined(limits)) {
        params.limits = limits;
      }

      var promise = Service.ws.sendCommand('AudioLibrary.GetArtists', params);
      var defer = $q.defer();

      promise.then(
        function(result) {
          if (result.artists) {
            for (var i = 0; i < result.artists.length; i++) {
              angular
                .forEach(result.artists[i], postLoadCleanUp, result.artists[i]);
            }
          }
          else {
            result.artists = [];
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
     * Retrieve details about a specific artist
     * @param {number} artistid - the id of the artist to retrieve
     * @private
     * @see [AudioLibrary.GetArtistDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#AudioLibrary.GetArtistDetails}
     */
    Service.getArtistDetails = function(artistid) {
      if (artistid < 0) {
        $log.error(
          'kodi.MusicLibraryService#getArtistDetails: artistid must be >= 0.',
          artistid);
        return;
      }

      var promise = Service.ws.sendCommand('AudioLibrary.GetArtistDetails', {
        artistid: artistid,
        properties: artistDetailedProperties
      });

      var defer = $q.defer();
      promise.then(
        function(result) {
          angular
            .forEach(result.artistdetails, postLoadCleanUp,
                     result.artistdetails);
          defer.resolve(result);
        },
        function(error) {
          defer.reject(error);
        }
      );

      return defer.promise;
    };

    /**
     * Update a artists details
     * @param {number} artistid - the id of the artist to update
     * @param {Object} updates - an object containing the updated fields
     * @public
     * @see [AudioLibrary.SetArtistDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#AudioLibrary.SetArtistDetails}
     */
    Service.setArtistDetails = function(artistid, updates) {
      angular.forEach(updates, preSaveCleanUp, updates);
      updates.artistid = artistid;

      var promise = Service.ws.sendCommand('AudioLibrary.SetArtistDetails',
        updates);
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    /**
     * Retrieve all albums
     * @public
     * @see [VideoLibrary.GetAlbums]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#AudioLibrary.GetAlbums}
     */
    Service.getAlbums = function(filter, limits) {
      var params = {
        properties: albumBasicProperties,
        sort: {order: 'ascending', ignorearticle: true, method: 'year'}
      };

      if (!angular.isUndefined(filter)) {
        params.filter = filter;
      }

      if (!angular.isUndefined(limits)) {
        params.limits = limits;
      }

      var promise = Service.ws.sendCommand('AudioLibrary.GetAlbums', params);
      var defer = $q.defer();

      promise.then(
        function(result) {
          if (result.albums) {
            for (var i = 0; i < result.albums.length; i++) {
              angular
                .forEach(result.albums[i], postLoadCleanUp, result.albums[i]);
            }
          }
          else {
            result.albums = [];
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
     * Retrieve details about a specific album
     * @param {number} albumid - the id of the album to retrieve
     * @private
     * @see [AudioLibrary.GetAlbumDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#AudioLibrary.GetAlbumDetails}
     */
    Service.getAlbumDetails = function(albumid) {
      if (albumid < 0) {
        $log.error(
          'kodi.MusicLibraryService#getAlbumDetails: albumid must be >= 0.',
          albumid);
        return;
      }

      var promise = Service.ws.sendCommand('AudioLibrary.GetAlbumDetails', {
        albumid: albumid,
        properties: albumDetailedProperties
      });

      var defer = $q.defer();
      promise.then(
        function(result) {
          angular
            .forEach(result.albumdetails, postLoadCleanUp,
                     result.albumdetails);
          defer.resolve(result);
        },
        function(error) {
          defer.reject(error);
        }
      );

      return defer.promise;
    };

    /**
     * Update an albums details
     * @param {number} albumid - the id of the album to update
     * @param {Object} updates - an object containing the updated fields
     * @public
     * @see [AudioLibrary.SetAlbumDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#AudioLibrary.SetAlbumDetails}
     */
    Service.setAlbumDetails = function(albumid, updates) {
      angular.forEach(updates, preSaveCleanUp, updates);
      updates.albumid = albumid;

      var promise = Service.ws.sendCommand('AudioLibrary.SetAlbumDetails',
        updates);
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    /**
     * Retrieve all songs
     * @public
     * @see [VideoLibrary.GetSongs]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#AudioLibrary.GetSongs}
     */
    Service.getSongs = function(filter, limits) {
      var params = {
        properties: songBasicProperties,
        sort: {order: 'ascending', ignorearticle: true, method: 'track'}
      };

      if (!angular.isUndefined(filter)) {
        params.filter = filter;
      }

      if (!angular.isUndefined(limits)) {
        params.limits = limits;
      }

      var promise = Service.ws.sendCommand('AudioLibrary.GetSongs', params);
      var defer = $q.defer();

      promise.then(
        function(result) {
          if (result.songs) {
            for (var i = 0; i < result.songs.length; i++) {
              angular
                .forEach(result.songs[i], postLoadCleanUp, result.songs[i]);
            }
          }
          else {
            result.songs = [];
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
     * Retrieve details about a specific album
     * @param {number} albumid - the id of the album to retrieve
     * @private
     * @see [AudioLibrary.GetAlbumDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#AudioLibrary.GetAlbumDetails}
     */
    Service.getSongDetails = function(songid) {
      if (songid < 0) {
        $log.error(
          'kodi.MusicLibraryService#getSongDetails: songid must be >= 0.',
          songid);
        return;
      }

      var promise = Service.ws.sendCommand('AudioLibrary.GetSongDetails', {
        songid: songid,
        properties: songDetailedProperties
      });

      var defer = $q.defer();
      promise.then(
        function(result) {
          angular
            .forEach(result.songdetails, postLoadCleanUp,
                     result.songdetails);
          defer.resolve(result);
        },
        function(error) {
          defer.reject(error);
        }
      );

      return defer.promise;
    };

    /**
     * Update an albums details
     * @param {number} albumid - the id of the album to update
     * @param {Object} updates - an object containing the updated fields
     * @public
     * @see [AudioLibrary.SetAlbumDetails]{@link
     *      http://kodi.wiki/view/JSON-RPC_API/v6#AudioLibrary.SetAlbumDetails}
     */
    Service.setSongDetails = function(songid, updates) {
      angular.forEach(updates, preSaveCleanUp, updates);
      updates.songid = songid;

      var promise = Service.ws.sendCommand('AudioLibrary.SetSongDetails',
        updates);
      // Storing in a variable for clarity on what's being returned
      return promise;
    };

    return Service;
  }

}(window, window.angular));
