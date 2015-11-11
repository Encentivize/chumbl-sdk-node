'use strict';
var chumblRequest=require("./chumbl-request.js");
var queryBuilder = require('./query-builder');
module.exports = {
    getValues: function (options, callback) {
        var url = "/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metrics/{targetDate}";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    getTimeline: function (options, callback) {
        var url = "/{chumblr}/timestores/{timestoreId}/entities/{entityId}/timeline/{startDate}/{endDate}"
        options.url = queryBuilder(url, options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    queryEntities: function (options, callback) {
        var url = "/{chumblr}/timestores/{timestoreId}/entities/{targetDate}";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    setValues: function (options, callback) {
        var url = "/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metrics/{targetDate}";
        options.url = queryBuilder(url, options);
        options.data = options.values || options.data;
        options.verb = "post";
        chumblRequest(options, callback);
    },
    getAllValuesForTimestore: function (options, callback) {
        var url = "/{chumblr}/timestores/{timestoreId}/metrics/{targetDate}";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    getTimestores: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/timestores";
        options.url = queryBuilder(url, options);
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getTimestore: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/timestores/{timestoreId}";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    addTimestore: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/timestores";
        options.data = options.timestore || options.data;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    updateTimestore: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/timestores/{timestoreId}";
        options.data = options.timestore || options.data;
        chumblRequest(options, callback);
    }
};