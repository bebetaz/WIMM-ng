(function(window, angular) {
  'use strict';

  angular
    .module('WIMM.common')
    .factory('KodiWebSocketService', KodiWebSocketService);

  function KodiWebSocketService ($q, $rootScope, $log, ngSocket, $http) {
    // We return this object to anything injecting our service
    var KodiWebSocket = {};

    // Keep all pending requests here until they get responses
    var callbacks = {};

    // Create a unique callback ID to map requests to responses
    var currentCallbackId = 0;

    // Create our WebSocket object with the address to the WebSocket
    var ws = false;

    /* ---------------------------------------------------------------------- *
     *   Web Socket Event Handlers                                            *
     * -----------------------------------------------------------------------*/

    /**
     * Handle recieved messages
     * @param {Object} message - the response from XBMC [MessageEvent]{
     * http://www.whatwg.org/specs/web-apps/current-work/#the-messageevent-interfaces})
     * @private
     * @see
     */
    function onMessage(messageObj) {
      var deferred;
      var results;

      // If an object exists with id in our callbacks object, resolve it
      if (callbacks.hasOwnProperty(messageObj.id)) {  // a response
        handleResponse(messageObj);
      }
      else if (angular.isArray(messageObj)) {  // a batch response
        deferred = callbacks[messageObj[0].id].cb;
        results = handleBatchResponse(messageObj);

        $log.log('kodiService#WS: response recieved. id =',
          messageObj[0].id, messageObj);

        if (!results.errors.length) {
          $rootScope.$apply(deferred.resolve(results));
        }
        else {
          $rootScope.$apply(deferred.reject(results));
        }

        delete callbacks[messageObj.id];
      }
      else if (messageObj.hasOwnProperty('method')) {  // a notification
        handleNotification(messageObj);
      }
      else {
        $log.warn('KodiWebSocket: unknown data recieved.', messageObj);
      }
    }

    function handleResponse(messageObj) {
      var deferred = callbacks[messageObj.id].cb;

      if (messageObj.hasOwnProperty('result')) {
        $log.log('KodiWebSocket: response recieved. id =',
          messageObj.id, messageObj.result);
        $rootScope.$apply(deferred.resolve(messageObj.result));
      }
      else if (messageObj.hasOwnProperty('error')) {
        $log.error('KodiWebSocket: error recieved. id =',
          messageObj.id, messageObj.error);
        $rootScope.$apply(deferred.reject(messageObj.error));
      }
      else {
        $log.warn('KodiWebSocket: unknown response. id =',
          messageObj.id, messageObj);
      }

      delete callbacks[messageObj.id];
    }

    function handleBatchResponse(messageObj) {
      var ret = {
        results: [],
        errors: []
      };

      for (var i = 0, len = messageObj.length; i < len; i++) {
        if (messageObj[i].hasOwnProperty('result')) {
          $log.log('KodiWebSocket: response recieved. id =',
            messageObj[i].id, messageObj[i].result);
          ret.results.push(messageObj[i].result);
        }
        else if (messageObj[i].hasOwnProperty('error')) {
          $log.error('KodiWebSocket: error recieved. id =',
            messageObj[i].id, messageObj[i].error);
          ret.errors.push(messageObj[i].error);
        }
        else {
          $log.warn('KodiWebSocket: unknown response. id =',
            messageObj.id, messageObj);
        }
      }

      return ret;
    }

    function handleNotification(messageObj) {
      $log.log('KodiWebSocket: notification recieved.', messageObj);
      $rootScope.$broadcast(messageObj.method, messageObj.params.data);
    }

    /**
     * Send a request over web socket
     * @param {Object} request - an XBMC JSON-RPC request object
     * @return {Object} - an AngularJS [promise]{
     *          http://docs.angularjs.org/api/ng/service/$q}
     * @private
     */
    function sendRequest(request) {
      var defer = $q.defer();
      var callbackId = getCallbackId();
      callbacks[callbackId] = {
        request: request,
        cb: defer
      };

      if (angular.isArray(request)) {
        for (var i = 0, len = request.length; i < len; i++) {
          request[i].id = callbackId;
        }
      }
      else {
        request.id = callbackId;
      }

      $log.log('KodiWebSocket: sending request. id =',
        callbackId, request);
      ws.send(angular.toJson(request));
      return defer.promise;
    }

    /**
     * Create a new callback id
     * @return {string} - the new callback id
     * @private
     */
    function getCallbackId() {
      currentCallbackId += 1;

      if (currentCallbackId > 10000) {
        currentCallbackId = 0;
      }

      return 'WIMM-' + currentCallbackId;
    }

    /* ---------------------------------------------------------------------- *
     *   Public Methods                                                       *
     * ---------------------------------------------------------------------- */

    KodiWebSocket.connect = function(url) {
      url = url || 'ws://' + window.location.host + ':9090/jsonrpc';
      $log.log('KodiWSFactory: connecting to ', url);
      ws = ngSocket(url);
      ws.onMessage(onMessage, {fromJson: true});
    };

    KodiWebSocket.isConnected = function() {
      return (ws && ws.readyState === WebSocket.OPEN);
    };

    KodiWebSocket.disconnect = function() {
      ws.close();
    };

    KodiWebSocket.sendCommand = function(method, params) {
      params = params || {};

      var request = {
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: 'WIMM'  // sendRequest() will amend a unique id to this
      };

      // Storing in a variable for clarity on what sendRequest returns
      var promise = sendRequest(request);
      return promise;
    };

    // http://trac.xbmc.org/ticket/14536
    KodiWebSocket.sendBatchCommand = function(method, params) {
      params = params || [{}];
      var requests = [];
      var promises = [];

      console.log(method, params);

      for (var i = 0, len = params.length; i < len; i++) {
        requests.push({
          jsonrpc: '2.0',
          method: method,
          params: params[i],
          id: 'WIMM'  // sendRequest() will amend a unique id to this
        });

        //if (i % 5 === 4) {
        //    promises.push(sendRequest(requests));
        //    requests = [];
        //}
      }

      if (requests.length > 0) {
        //promises.push(sendRequest(requests));
        //requests = [];
        console.log(JSON.stringify(requests).length);
        promises = $http.post('/jsonrpc', JSON.stringify(requests));
      }

      // Storing in a variable for clarity on what sendRequest returns
      //var promise = sendRequest(request);
      return promises; //$q.all(promises);
    };

    return KodiWebSocket;
  }

}(window, window.angular));
