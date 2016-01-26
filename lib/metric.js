'use strict';
var chumblRequest=require("./chumbl-request.js");
var queryBuilder = require('./query-builder');

var metric = {
    getValue: getValue,
    getValues: getValues,
    countValues: countValues,
    aggregateValues: aggregateValues,
    setValue: setValue,
    incrementValue : incrementValue, 
    getMetric: getMetric,
    getMetrics: getMetrics,
    countAllValues: countAllValues,
    aggregateAllValues: aggregateAllValues,
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

function aggregateValues(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics/{metricId}/values/aggregate", options);
    options.verb = "get";
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

function countAllValues(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics/values/count", options);
    options.verb = "get";
    options.errorIfNoResult=true;
    chumblRequest(options, callback);
}

function aggregateAllValues(options, callback) {
    options.url = queryBuilder("/{chumblr}/metrics/values/aggregate", options);
    options.verb = "get";
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
