'use strict';
var makeRestRequest = require('./make-rest-request');
module.exports = {
    getDatastoreValue: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values/{identifier}/{targetDate}";
        if (!options.targetDate) {
            url = url.replace("{targetDate}", "");
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    },
    getDatastoreValues: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        function requestMade(err, result, statusCode, location) {

            return callback(err, result, statusCode, location);
        }

        makeRestRequest(options, requestMade);
    },
    addDatastoreValue: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values";
        options.verb = "post";
        options.url = url;
        makeRestRequest(options, callback);
    },
    setDatastoreValue: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values/{identifier}/{targetDate}";
        if (!options.targetDate) {
            url = url.replace("/{targetDate}", "");
        }
        options.verb = "put";
        options.url = url;
        makeRestRequest(options, callback);
    },
    removeDatastoreValue: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values/{identifier}";
        options.verb = "del";
        options.url = url;
        makeRestRequest(options, callback);
    },
    getDatastores: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/datastores";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    },
    getDatastore: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/datastores/{datastoreId}";
        makeRestRequest(options, callback);
    },
    addDatastore: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/datastores";
        options.data = options.datastore;
        makeRestRequest(options, callback);
    },
    updateDatastore: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/datastores/{datastoreId}";
        options.data = options.datastore;
        makeRestRequest(options, callback);
    }
};