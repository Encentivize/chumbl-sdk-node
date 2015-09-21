'use strict'
var makeRestRequest = require('./make-rest-request');
module.exports = {
    getValues: function (options, callback) {
        var url = "/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metrics/{targetDate}";
        if (!options.targetDate) {
            url = url.replace("/{targetDate}", "");
        }
        options.verb = "get";
        options.url = url;
        if (options.metrics) {
            options.query = "metrics=" + options.metrics;
        }
        makeRestRequest(options, callback);
    },
    getTimeline: function (options, callback) {
        var metrics = "";
        if (options.metrics) {
            metrics = options.metrics.join(",");
        }
        var url = "/{chumblr}/timestores/{timestoreId}/entities/{entityId}/timeline/{startDate}/{endDate}?metrics=" + metrics;
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    },
    queryEntities: function (options, callback) {

        var url = "/{chumblr}/timestores/{timestoreId}/entities/{targetDate}";
        if (!options.targetDate) {
            url = url.replace("/{targetDate}", "");
        }
        if (options.query) {
            url += "?" + options.query;
        }

        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    },
    setValues: function (options, callback) {
        var url = "/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metrics/{targetDate}";
        if (!options.targetDate) {
            url = url.replace("/{targetDate}", "");
        }
        options.data = options.values;
        options.verb = "post";
        options.url = url;
        makeRestRequest(options, callback);
    },
    getAllValuesForTimestore: function (options, callback) {
        var url = "/{chumblr}/timestores/{timestoreId}/metrics/{targetDate}";
        if (!options.targetDate) {
            url = url.replace("/{targetDate}", "");
        }
        options.verb = "get";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    },
    getTimestores: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/timestores";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    },
    getTimestore: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/timestores/{timestoreId}";
        makeRestRequest(options, callback);
    },
    addTimestore: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/timestores";
        options.data = options.timestore;
        makeRestRequest(options, callback);
    },
    updateTimestore: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/timestores/{timestoreId}";
        options.data = options.timestore;
        makeRestRequest(options, callback);
    }
};