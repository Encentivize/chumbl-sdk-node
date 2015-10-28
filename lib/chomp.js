'use strict';
var chumblRequest=require("./chumbl-request.js");

module.exports = {
    getChompQItem: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/chompq/{chompQId}";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    addQItemStatus: function (options, callback) {
        options.data = options.status;
        options.verb = "post";
        options.url = "/{chumblr}/chompq/{chompQId}/status";
        chumblRequest(options, callback);
    },
    getChomps: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/chomps";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getChomp: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/chomps/{chompId}";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    } ,
    getMergedChomp: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/chomps/{chompId}/merged";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },

    runChomp: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/chomps/{chompId}/run";
        options.data = options.inputData;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    addChomp: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/chomps";
        options.data = options.chomp;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    updateChomp: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/chomps/{chompId}";
        options.data = options.chomp;
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
        options.data = options.scheduledRun;
        chumblRequest(options, callback);
    },
    getScheduledRuns: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/chomps/{chompId}/scheduledruns";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        chumblRequest(options, callback);
    },
    getRunQ: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/chomps/{chompId}/runq";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    }
};
