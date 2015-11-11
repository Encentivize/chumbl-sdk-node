'use strict';
var chumblRequest=require("./chumbl-request.js");

var metric = {
    getValue: getValue,
    getValues: getValues,
    setValue: setValue,
    incrementValue : incrementValue, 
    getMetric: getMetric,
    getMetrics: getMetrics,
    addMetric: addMetric,
    updateMetric: updateMetric
};

function getValue(options, callback) {
    options.url = "/{chumblr}/metrics/{metricId}/entities/{entityId}/value";
    options.verb = "get";
    options.errorIfNoResult=true;
    chumblRequest(options, callback);
}

function getValues(options, callback) {
    options.url = "/{chumblr}/metrics/{metricId}/values";
    options.verb = "get";
    options.errorIfNoResult=true;
    chumblRequest(options, callback);
}

function setValue(options, callback) {
    options.url = "/{chumblr}/metrics/{metricId}/entities/{entityId}/value";
    options.verb = "post";
    chumblRequest(options, callback);
}

function incrementValue(options, callback) {
    options.url = "/{chumblr}/metrics/{metricId}/entities/{entityId}/value/increment";
    options.verb = "post";
    chumblRequest(options, callback);
}

function getMetrics(options, callback) {
    options.url = "/{chumblr}/metrics";
    options.verb = "get";
    options.errorIfNoResult=true;
    chumblRequest(options, callback);
}

function getMetric(options, callback) {
    options.url = "/{chumblr}/metrics/{metricId}";
    options.verb = "get";
    options.errorIfNoResult=true;
    chumblRequest(options, callback);
}

function addMetric(options, callback) {
    options.url = "/{chumblr}/metrics";
    options.verb = "post";
    options.data = options.metric || options.data;
    options.errorIfNoResult=true;
    chumblRequest(options, callback);
}

function updateMetric(options, callback) {
    options.url = "/{chumblr}/metrics/{metricId}";
    options.verb = "put";
    options.data = options.metric || options.data;
    chumblRequest(options, callback);
}

module.exports = metric;
