'use strict';
var chumblRequest=require("./chumbl-request.js");
var memoryCache=require("memory-cache");
var _memoryCacheTimeout=60000;
var queryBuilder = require('./query-builder');

var variables = {
    getVariables: function (options, callback) {
        var cacheId="variables_" + options.chumblr + (options.query ? "_" + options.query : "");
        var cacheItem=memoryCache.get(cacheId);
        if (cacheItem){
            return callback(null,cacheItem,{cache:true,status:200});
        }
        options.verb = "get";
        var url = "/{chumblr}/variables";
        options.url = queryBuilder(url, options);
        options.errorIfNoResult=true;

        function requested(err,result,additionalInfo,optLocation){
            if(!err){
                memoryCache.put(cacheId,result,_memoryCacheTimeout);
            }

            return callback(err,result,additionalInfo,optLocation);
        }
        chumblRequest(options, requested);


    },
    getVariable: function (options, callback) {
        var cacheId="variables_" +options.chumblr + "_" + options.variableId;
        var cacheItem=memoryCache.get(cacheId);
        if (cacheItem) {
            return callback(null, cacheItem, {cache: true, status: 200});
        }
        options.url = "/{chumblr}/variables/{variableId}";
        options.errorIfNoResult=true;
        options.verb = "get";
        function requested(err,result,additionalInfo,optLocation){
            if(!err){
                memoryCache.put(cacheId,result,_memoryCacheTimeout);
            }

            return callback(err,result,additionalInfo,optLocation);
        }
        chumblRequest(options, requested);
    },
    getVariableValue: function (options, callback) {
        options.url = "/{chumblr}/variables/{variableId}";
        options.verb = "get";
        options.errorIfNoResult=true;
        function variableRetrieved(err, variable,requestResult) {
            if (err) {
                return callback(err,variable,requestResult);
            }
            if (!variable) {
                return callback(null, null,requestResult);
            }
            return callback(null, variable.value,requestResult);
        }
        variables.getVariable(options, variableRetrieved);
    },
    addVariable: function (options, callback) {
        options.url = "/{chumblr}/variables";
        options.verb = "post";
        options.data = options.variable || options.data;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    setVariable: function (options, callback) {
        options.url = "/{chumblr}/variables/{variableId}";
        options.verb = "put";
        options.data = options.variable || options.data;
        chumblRequest(options, callback);
    }
};

module.exports = variables;