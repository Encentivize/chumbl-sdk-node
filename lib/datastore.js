'use strict';
var chumblRequest=require("./chumbl-request.js");
var queryBuilder = require('./query-builder');
module.exports = {
    getDatastoreValue: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/datastores/{datastoreId}/values/{identifier}/{targetDate}", options);
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getDatastoreValues: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/datastores/{datastoreId}/values", options);
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getDatastoreValuesAggregate: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/datastores/{datastoreId}/values/aggregate", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    addDatastoreValue: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/datastores/{datastoreId}/values", options);
        options.verb = "post";
        chumblRequest(options, callback);
    },
    setDatastoreValue: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/datastores/{datastoreId}/values/{identifier}/{targetDate}", options);
        options.verb = "put";
        chumblRequest(options, callback);
    },
    removeDatastoreValue: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/datastores/{datastoreId}/values/{identifier}", options);
        options.verb = "del";
        chumblRequest(options, callback);
    },
    getDatastores: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/datastores", options);
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getDatastore: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/datastores/{datastoreId}", options);
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    addDatastore: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/datastores", options);
        options.verb = "post";
        options.data = options.datastore || options.data;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    updateDatastore: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/datastores/{datastoreId}", options);
        options.verb = "put";
        options.data = options.datastore || options.data;
        chumblRequest(options, callback);
    }
};