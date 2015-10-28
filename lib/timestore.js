'use strict';
var chumblRequest=require("./chumbl-request.js");
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
        chumblRequest(options, callback);
    },
    getTimeline: function (options, callback) {
        var metrics = "";
        if (options.metrics) {
            metrics = options.metrics.join(",");
        }
        var url = "/{chumblr}/timestores/{timestoreId}/entities/{entityId}/timeline/{startDate}/{endDate}?metrics=" + metrics;
        options.verb = "get";
        options.url = url;
        chumblRequest(options, callback);
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
        chumblRequest(options, callback);
    },
    setValues: function (options, callback) {
        var url = "/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metrics/{targetDate}";
        if (!options.targetDate) {
            url = url.replace("/{targetDate}", "");
        }
        options.data = options.values;
        options.verb = "post";
        options.url = url;
        chumblRequest(options, callback);
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
        chumblRequest(options, callback);
    },
    getTimestores: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/timestores";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
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
        options.data = options.timestore;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    updateTimestore: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/timestores/{timestoreId}";
        options.data = options.timestore;
        chumblRequest(options, callback);
    }
};