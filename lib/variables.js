'use strict';

var LRU = require('lru-cache');
var _memoryCacheTimeout = 60000;
var memoryCache = LRU({
    max: 1000,
    maxAge: _memoryCacheTimeout
});
var chumblRequest = require("./chumbl-request.js");
var queryBuilder = require('./query-builder');

var variables = {
    getVariables: function (options, callback) {
        var cacheId = "variables_" + options.chumblr + (options.query ? "_" + options.query : "");
        var cacheItem = memoryCache.get(cacheId);
        if (cacheItem) {
            return callback(null, cacheItem, {cache: true, status: 200});
        }
        options.url = queryBuilder("/{chumblr}/variables", options);
        options.verb = "get";
        options.errorIfNoResult = true;

        function requested(err, result, additionalInfo, optLocation) {
            if (!err) {
                memoryCache.set(cacheId, result, _memoryCacheTimeout);
            }

            return callback(err, result, additionalInfo, optLocation);
        }

        chumblRequest(options, requested);


    },
    getVariable: function (options, callback) {
        var cacheId = "variables_" + options.chumblr + "_" + options.variableId;
        var cacheItem = memoryCache.get(cacheId);
        if (cacheItem) {
            return callback(null, cacheItem, {cache: true, status: 200});
        }
        options.url = queryBuilder("/{chumblr}/variables/{variableId}", options);
        options.errorIfNoResult = true;
        options.verb = "get";
        function requested(err, result, additionalInfo, optLocation) {
            if (!err) {
                memoryCache.set(cacheId, result, _memoryCacheTimeout);
            }

            return callback(err, result, additionalInfo, optLocation);
        }

        chumblRequest(options, requested);
    },
    getVariableValue: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/variables/{variableId}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        function variableRetrieved(err, variable, requestResult) {
            if (err) {
                return callback(err, variable, requestResult);
            }
            if (!variable) {
                return callback(null, null, requestResult);
            }
            return callback(null, variable.value, requestResult);
        }

        variables.getVariable(options, variableRetrieved);
    },
    addVariable: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/variables", options);
        options.verb = "post";
        options.data = options.variable || options.data;
        options.errorIfNoResult = false;
        chumblRequest(options, callback);
    },
    setVariable: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/variables/{variableId}", options);
        options.verb = "put";
        options.data = options.variable || options.data;
        chumblRequest(options, callback);
    }
};

module.exports = variables;