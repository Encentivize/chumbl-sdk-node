'use strict';
var chumblRequest=require("./chumbl-request.js");
var queryBuilder = require('./query-builder');

var metric = {
    getValue: getValue,
    getValues: getValues,
    countValues: countValues,
    setValue: setValue,
    incrementValue : incrementValue, 
    getMetric: getMetric,
    getMetrics: getMetrics,
    addMetric: addMetric,
    updateMetric: updateMetric
};

function getValue(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics/{metricId}/entities/{entityId}/value", options);
    options.verb = "get";
    options.errorIfNoResult=true;
    chumblRequest(options, callback);
}

function getValues(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics/{metricId}/values", options);
    options.verb = "get";
    options.errorIfNoResult=true;
    chumblRequest(options, callback);
}

function countValues(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics/{metricId}/values/count", options);
    options.verb = "get";
    options.errorIfNoResult=true;
    chumblRequest(options, callback);
}

function setValue(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics/{metricId}/entities/{entityId}/value", options);
    options.verb = "post";
    chumblRequest(options, callback);
}

function incrementValue(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics/{metricId}/entities/{entityId}/value/increment", options);
    options.verb = "post";
    chumblRequest(options, callback);
}

function getMetrics(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics", options);
    options.verb = "get";
    options.errorIfNoResult=false;
    chumblRequest(options, callback);
}

function getMetric(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics/{metricId}", options);
    options.verb = "get";
    options.errorIfNoResult=true;
    chumblRequest(options, callback);
}

function addMetric(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics", options);
    options.verb = "post";
    options.data = options.metric || options.data;
    options.errorIfNoResult=false;
    chumblRequest(options, callback);
}

function updateMetric(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics/{metricId}", options);
    options.verb = "put";
    options.data = options.metric || options.data;
    chumblRequest(options, callback);
}

module.exports = metric;
