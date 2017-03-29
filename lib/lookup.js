'use strict';

var LRU = require('lru-cache');
var _memoryCacheTimeout = 60000;
var memoryCache = LRU({
    max: 1000,
    maxAge: _memoryCacheTimeout
});
var chumblRequest = require("./chumbl-request.js");
var queryBuilder = require('./query-builder');

var lookup = {
    getLookups: function (options, callback) {
        var cacheId = "lookups_" + options.chumblr + (options.query ? "_" + options.query : "");
        var cacheItem = memoryCache.get(cacheId);
        if (cacheItem) {
            return callback(null, cacheItem, {cache: true, status: 200});
        }
        options.url = queryBuilder("/{chumblr}/lookups", options);
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
    getLookup: function (options, callback) {
        var cacheId = "lookups_" + options.chumblr + "_" + (options.lookupName ? options.lookupName : options.lookupId);
        var cacheItem = memoryCache.get(cacheId);
        if (cacheItem) {
            return callback(null, cacheItem, {cache: true, status: 200});
        }
        if (options.lookupName) {
            options.url = queryBuilder("/{chumblr}/lookups/{lookupName}", options);
        } else {
            options.url = queryBuilder("/{chumblr}/lookups/{lookupId}", options);
        }
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
    getLookupValues: function (options, callback) {
        var cacheId = "lookupvalues_" + options.chumblr + "_" + options.lookupId;
        var cacheItem = memoryCache.get(cacheId);
        if (cacheItem) {
            return callback(null, cacheItem, {cache: true, status: 200});
        }
        if (options.lookupName) {
            options.url = queryBuilder("/{chumblr}/lookups/{lookupName}/values", options);
        } else {
            options.url = queryBuilder("/{chumblr}/lookups/{lookupId}/values", options);
        }
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
    getLookupSchema: function (options, callback) {
        if (options.lookupName) {
            options.url = queryBuilder("/{chumblr}/lookups/{lookupName}/schema", options);
        } else {
            options.url = queryBuilder("/{chumblr}/lookups/{lookupId}/schema", options);
        }
        options.verb = "get";
        chumblRequest(options, callback);
    },
    vLookup: function (options, callback) {
        lookup.getLookup(options, lookupRetrieved);
        function lookupRetrieved(err, lookupTable) {
            if (err) {
                return callback(err);
            }
            if (!lookupTable) {
                return callback("lookup table unavailable for vlookup:" + options.lookupName || options.lookupId);
            }

            function lookupValuesRetrieved(err, lookupValues) {
                if (err) {
                    return callback(err);
                }
                if (!lookupValues) {
                    return callback("lookup table unavailable for vlookup:" + options.lookupName || options.lookupId);
                }
                var foundValue = null;
                for (var i = 0; i < lookupValues.length; i++) {
                    if (lookupValues[i][options.lookupColumn] === options.value) {
                        if (lookupValues[i][options.returnColumn] || lookupValues[i][options.returnColumn] === 0) {
                            foundValue = lookupValues[i][options.returnColumn];
                        }
                        break;
                    }
                }
                return callback(null, foundValue);
            }

            options.lookupId = lookupTable._id.toString();
            lookup.getLookupValues(options, lookupValuesRetrieved);
        }
    },

    addLookup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/lookups", options);
        options.verb = "post";
        options.data = options.lookup || options.data;
        options.errorIfNoResult = false;
        chumblRequest(options, callback);
    },

    updateLookup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/lookups/{lookupId}", options);
        options.verb = "put";
        options.data = options.lookup || options.data;
        chumblRequest(options, callback);
    },

    setLookupValues: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/lookups/{lookupId}/values?noCache=true", options);
        options.verb = "put";
        options.data = options.lookupValues || options.data;
        chumblRequest(options, callback);
    }
};

module.exports = lookup;