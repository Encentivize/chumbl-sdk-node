'use strict';
var chumblRequest = require('./chumbl-request.js');
var queryBuilder = require('./query-builder');
module.exports = {
    getChompQItem: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chompq/{chompQId}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addQItemStatus: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chompq/{chompQId}/status", options);
        options.verb = "post";
        options.data = options.status || options.data;
        chumblRequest(options, callback);
    },
    getChomps: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chomps", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getChomp: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chomps/{chompId}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getMergedChomp: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chomps/{chompId}/merged", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },

    runChomp: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chomps/{chompId}/run", options);
        options.verb = "post";
        options.data = options.inputData || options.data;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addChomp: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chomps", options);
        options.verb = "post";
        options.data = options.chomp || options.data;
        options.errorIfNoResult = false;
        chumblRequest(options, callback);
    },
    updateChomp: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chomps/{chompId}", options);
        options.verb = "put";
        options.data = options.chomp || options.data;
        chumblRequest(options, callback);
    },
    removeChomp: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chomps/{chompId}", options);
        options.verb = "del";
        chumblRequest(options, callback);
    },
    addScheduledRun: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chomps/{chompId}/scheduledruns", options);
        options.verb = "post";
        options.data = options.scheduledRun || options.data;
        chumblRequest(options, callback);
    },
    getScheduledRuns: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chomps/{chompId}/scheduledruns", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    getRunQ: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/chomps/{chompId}/runq", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    }
};
