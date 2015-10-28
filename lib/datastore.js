'use strict';
var chumblRequest=require("./chumbl-request.js");
module.exports = {
    getDatastoreValue: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values/{identifier}/{targetDate}";
        if (!options.targetDate) {
            url = url.replace("{targetDate}", "");
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getDatastoreValues: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getDatastoreValuesAggregate: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values/aggregate";
        if (options.query) {
            url += "?" + options.query;
        }
        else {
            url += "?";
        }
        if (options.rawQuery) {
            url += "&" + "rawQuery=" + JSON.stringify(options.rawQuery);
        }
        url += "&" + "aggregate=" + options.aggregate;
        options.verb = "get";
        options.url = url;

        chumblRequest(options, callback);
    },
    addDatastoreValue: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values";
        options.verb = "post";
        options.url = url;
        chumblRequest(options, callback);
    },
    setDatastoreValue: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values/{identifier}/{targetDate}";
        if (!options.targetDate) {
            url = url.replace("/{targetDate}", "");
        }
        options.verb = "put";
        options.url = url;
        chumblRequest(options, callback);
    },
    removeDatastoreValue: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values/{identifier}";
        options.verb = "del";
        options.url = url;
        chumblRequest(options, callback);
    },
    getDatastores: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/datastores";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getDatastore: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/datastores/{datastoreId}";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    addDatastore: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/datastores";
        options.data = options.datastore;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    updateDatastore: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/datastores/{datastoreId}";
        options.data = options.datastore;
        chumblRequest(options, callback);
    }
};