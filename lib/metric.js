'use strict';
var makeRestRequest = require('./make-rest-request');

var metric = {
    getValue: getValue,
    getValues: getValues,
    setValue: setValue,
    getMetric: getMetric,
    getMetrics: getMetrics,
    addMetric: addMetric,
    updateMetric: updateMetric
};

function getValue(options, callback) {
    options.url = "/{chumblr}/metrics/{metricId}/entities/{entityId}/value";
    options.verb = "get";
    makeRestRequest(options, callback);
}

function getValues(options, callback) {
    options.url = "/{chumblr}/metrics/{metricId}/values";
    options.verb = "get";
    makeRestRequest(options, callback);
}

function setValue(options, callback) {
    options.url = "/{chumblr}/metrics/{metricId}/entities/{entityId}/value";
    options.verb = "post";
    makeRestRequest(options, callback);
}

function getMetrics(options, callback) {
    options.url = "/{chumblr}/metrics";
    options.verb = "get";
    makeRestRequest(options, callback);
}

function getMetric(options, callback) {
    options.url = "/{chumblr}/metrics/{metricId}";
    options.verb = "get";
    makeRestRequest(options, callback);
}

function addMetric(options, callback) {
    options.url = "/{chumblr}/metrics";
    options.verb = "post";
    options.data = options.metric;
    makeRestRequest(options, callback);
}

function updateMetric(options, callback) {
    options.url = "/{chumblr}/metrics/{metricId}";
    options.verb = "put";
    options.data = options.metric;
    makeRestRequest(options, callback);
}

module.exports = metric;
