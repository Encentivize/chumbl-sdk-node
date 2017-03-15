'use strict';

var chumblRequest = require("./chumbl-request.js");
var queryBuilder = require('./query-builder');

module.exports = {
    getTimestoreGroups: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestoregroups", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addTimestoreGroup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestoregroups", options);
        options.verb = "post";
        // the new timestore group must be stored in options.data
        chumblRequest(options, callback);
    },
    getTimestoreGroup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestoregroups/{timestoreGroupId}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    updateTimestoreGroup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestoregroups/{timestoreGroupId}", options);
        options.verb = "put";
        // the updated timestore group must be stored in options.data
        chumblRequest(options, callback);
    },
    getMetricValuesForAllEntities: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestoregroups/{timestoreGroupId}/metrics/{targetDate}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    getMetricValuesForEntity: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/timestoregroups/{timestoreGroupId}/metrics/entities/{entityId}/{targetDate}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    }
};