'use strict';
var chumblRequest=require("./chumbl-request.js");
var queryBuilder = require('./query-builder');
module.exports = {
    getDatastoreValue: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values/{identifier}/{targetDate}";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getDatastoreValues: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getDatastoreValuesAggregate: function (options, callback) {
        var url = "/{chumblr}/datastores/{datastoreId}/values/aggregate";
        options.url = queryBuilder(url, options);
        options.verb = "get";
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
        options.url = queryBuilder(url, options);
        options.verb = "put";
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
        options.url = queryBuilder(url, options);
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
        options.data = options.datastore || options.data;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    updateDatastore: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/datastores/{datastoreId}";
        options.data = options.datastore || options.data;
        chumblRequest(options, callback);
    }
};