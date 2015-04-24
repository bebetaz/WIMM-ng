(function(angular) {
  'use strict';

  angular
    .module('WIMM.music', [
    ])
    .config(config);

  function config(gettext, $stateProvider) {
    $stateProvider
      .state('music', {
        abstract: true,
        url: '/music',
        templateUrl: 'assets/templates/music/index.html'
      })
      .state('music.artists', {
        url: '/by-artist?page',
        templateUrl: 'assets/templates/music/artist-list.html',
        controller: 'ListArtistsCtrl',
        resolve: {
          artists: getArtists
        }
      })
      .state('artist', {
        url: '^/artist-{artistid:int}',
        templateUrl: 'assets/templates/music/artist.html',
        controller: 'ArtistCtrl',
        resolve: {
          artist: getArtist,
          albums: getAlbums
        }
      })
      .state('album', {
        url: '^/album-{albumid:int}',
        templateUrl: 'assets/templates/music/album.html',
        controller: 'AlbumCtrl',
        resolve: {
          album: getAlbum,
          songs: getSongs
        }
      })
      .state('song', {
        url: '^/song-{songid:int}',
        templateUrl: 'assets/templates/music/song.html',
        controller: 'SongCtrl',
        resolve: {
          song: getSong
        }
      });
  }

  function getArtists(CONFIG, MusicLibraryService, $stateParams) {
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
    }

    return MusicLibraryService.getArtists(filter, limits);
  }

  function getArtist(MusicLibraryService, $stateParams) {
    return MusicLibraryService.getArtistDetails($stateParams.artistid);
  }

  function getAlbums(MusicLibraryService, $stateParams) {
    var filter = {
      artistid: $stateParams.artistid
    };

    return MusicLibraryService.getAlbums(filter);
  }

  function getAlbum(MusicLibraryService, $stateParams) {
    return MusicLibraryService.getAlbumDetails($stateParams.albumid);
  }

  function getSongs(MusicLibraryService, $stateParams) {
    var filter = {
      albumid: $stateParams.albumid
    };

    return MusicLibraryService.getSongs(filter);
  }

  function getSong(MusicLibraryService, $stateParams) {
    return MusicLibraryService.getSongDetails($stateParams.songid);
  }

}(window.angular));
