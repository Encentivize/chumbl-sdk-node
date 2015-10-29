'use strict';
var chumblRequest=require("./chumbl-request.js");
var memoryCache=require("memory-cache");
var _memoryCacheTimeout=60000;


var lookup = {
    getLookups: function (options, callback) {
        var cacheId="lookups_" + options.chumblr + (options.query ? "_" + options.query : "");
        var cacheItem=memoryCache.get(cacheId);
        if (cacheItem){
            return callback(null,cacheItem,{cache:true,status:200});
        }


        options.verb = "get";
        var url = "/{chumblr}/lookups";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.errorIfNoResult=true;

        function requested(err,result,additionalInfo,optLocation){
            if(!err){
                memoryCache.put(cacheId,result,_memoryCacheTimeout);
            }

            return callback(err,result,additionalInfo,optLocation)
        }
        chumblRequest(options, requested);
    },
    getLookup: function (options, callback) {
        var cacheId="lookups_" + options.chumblr + "_" + (options.lookupName?options.lookupName:options.lookupId);
        var cacheItem=memoryCache.get(cacheId);
        if (cacheItem){
            return callback(null,cacheItem,{cache:true,status:200});
        }


        if (options.lookupName) {
            options.url = "/{chumblr}/lookups/{lookupName}";
        } else {
            options.url = "/{chumblr}/lookups/{lookupId}";
        }
        options.verb = "get";
        options.errorIfNoResult=true;

        function requested(err,result,additionalInfo,optLocation){
            if(!err){
                memoryCache.put(cacheId,result,_memoryCacheTimeout);
            }

            return callback(err,result,additionalInfo,optLocation)
        }

        chumblRequest(options, requested);
    },
    getLookupValues: function (options, callback) {
        var cacheId="lookupvalues_" + options.chumblr + "_" +  options.lookupId;
        var cacheItem=memoryCache.get(cacheId);
        if (cacheItem){
            return callback(null,cacheItem,{cache:true,status:200});
        }

        options.verb = "get";
        options.url = "/{chumblr}/lookups/{lookupId}/values";
        options.errorIfNoResult=true;

        function requested(err,result,additionalInfo,optLocation){
            if(!err){
                memoryCache.put(cacheId,result,_memoryCacheTimeout);
            }

            return callback(err,result,additionalInfo,optLocation)
        }

        chumblRequest(options, requested);


    },
    getLookupSchema: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/lookups/{lookupId}/schema";
        chumblRequest(options, callback);
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
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },

    updateLookup: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/lookups/{lookupId}";
        options.data = options.lookup;
        chumblRequest(options, callback);
    },

    setLookupValues: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/lookups/{lookupId}/values?noCache=true";
        options.data = options.lookupValues;
        chumblRequest(options, callback);
    }
};

module.exports = lookup;