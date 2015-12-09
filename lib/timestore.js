'use strict';
var chumblRequest = require("./chumbl-request.js");
var queryBuilder = require('./query-builder');
module.exports = {
    getTimestores: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTimestore: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addTimestore: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores", options);
        options.verb = "post";
        options.data = options.timestore || options.data;
        chumblRequest(options, callback);
    },
    updateTimestore: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}", options);
        options.verb = "put";
        options.data = options.timestore || options.data;
        chumblRequest(options, callback);
    },
    deleteTimestore: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}", options);
        options.verb = "delete";
        options.data = options.timestore || options.data;
        chumblRequest(options, callback);
    },
    queryEntities: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}/entities/{targetDate}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    countEntities: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}/count/{targetDate}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    aggregateEntities: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}/aggregate/{targetDate}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    getAllValuesForTimestore: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}/metrics/{targetDate}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    getValues: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metrics/{targetDate}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    setValues: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metrics/{targetDate}", options);
        options.data = options.values || options.data;
        options.verb = "post";
        chumblRequest(options, callback);
    },
    getMetricValue: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metric/{metricName}/{targetDate}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    setMetricValues: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metric/{metricName}/{targetDate}", options);
        options.data = options.values || options.data;
        options.verb = "post";
        chumblRequest(options, callback);
    },
    incrementMetricValues: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metric/{metricName}/increment/{targetDate}", options);
        options.data = options.values || options.data;
        options.verb = "post";
        chumblRequest(options, callback);
    },
    incrementIfMetricValues: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metric/{metricName}/incrementif/{targetDate}", options);
        options.data = options.values || options.data;
        options.verb = "post";
        chumblRequest(options, callback);
    },
    getTimeline: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestores/{timestoreId}/entities/{entityId}/timeline/{startDate}/{endDate}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    }
};