'use strict';
var makeRestRequest = require('./make-rest-request');
var lookup = {

    getLookups: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/lookups";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    }, getLookup: function (options, callback) {
        if (options.lookupName) {
            options.url = "/{chumblr}/lookups/{lookupName}";
        } else {
            options.url = "/{chumblr}/lookups/{lookupId}";
        }
        options.verb = "get";

        makeRestRequest(options, callback);

    }, getLookupValues: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/lookups/{lookupId}/values";
        var retryCnt = 5;
        makeRequest();
        function makeRequest() {
            retryCnt--;
            function requestMade(err, result, statusCode) {
                if (err) {
                    return callback(err, result, statusCode);
                }
                if (!result && retryCnt > 0) {
                    console.warn("retrying get lookup");
                    setTimeout(makeRequest, 1000);
                }
                else {
                    return callback(err, result, statusCode);
                }
            }

            makeRestRequest(options, requestMade);
        }

    }, getLookupSchema: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/lookups/{lookupId}/schema";
        makeRestRequest(options, callback);
    },

    vLookup: function (options, callback) {
        var lookupId = null;
        if (options.lookupName) {
            lookupId = options.lookupName;
        } else {
            lookupId = options.lookupId;
        }

        function lookupRetrieved(err, lookupTable) {
            if (err) {
                return callback(err);
            }
            if (!lookupTable) {
                return callback("lookup table unavailable for vlookup:" + lookupId);
            }

            function lookupValuesRetrieved(err, lookupValues) {
                if (err) {
                    return callback(err);
                }
                if (!lookupValues) {
                    return callback("lookup table unavailable for vlookup:" + lookupId);
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

        lookup.getLookup(options, lookupRetrieved);
    },

    addLookup: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/lookups";
        options.data = options.lookup;
        makeRestRequest(options, callback);
    },

    updateLookup: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/lookups/{lookupId}";
        options.data = options.lookup;
        makeRestRequest(options, callback);
    },

    setLookupValues: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/lookups/{lookupId}/values?noCache=true";
        options.data = options.lookupValues;
        makeRestRequest(options, callback);
    }
};

module.exports = lookup;