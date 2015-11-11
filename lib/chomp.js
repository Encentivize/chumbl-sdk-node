'use strict';
var chumblRequest = require('./chumbl-request.js');
var queryBuilder = require('./query-builder');
module.exports = {
    getChompQItem: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/chompq/{chompQId}";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addQItemStatus: function (options, callback) {
        options.data = options.status || options.data;
        options.verb = "post";
        options.url = "/{chumblr}/chompq/{chompQId}/status";
        chumblRequest(options, callback);
    },
    getChomps: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/chomps";
        options.url = queryBuilder(url, options);
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getChomp: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/chomps/{chompId}";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getMergedChomp: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/chomps/{chompId}/merged";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },

    runChomp: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/chomps/{chompId}/run";
        options.data = options.inputData || options.data;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addChomp: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/chomps";
        options.data = options.chomp || options.data;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    updateChomp: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/chomps/{chompId}";
        options.data = options.chomp || options.data;
        chumblRequest(options, callback);
    },
    removeChomp: function (options, callback) {
        options.verb = "del";
        options.url = "/{chumblr}/chomps/{chompId}";
        chumblRequest(options, callback);
    },
    addScheduledRun: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/chomps/{chompId}/scheduledruns";
        options.data = options.scheduledRun || options.data;
        chumblRequest(options, callback);
    },
    getScheduledRuns: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/chomps/{chompId}/scheduledruns";
        options.url = queryBuilder(url, options);
        chumblRequest(options, callback);
    },
    getRunQ: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/chomps/{chompId}/runq";
        options.url = queryBuilder(url, options);
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    }
};
