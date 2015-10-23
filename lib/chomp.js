'use strict';
var makeRestRequest = require('./make-rest-request');
module.exports = {
    getChompQItem: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/chompq/{chompQId}";
        makeRestRequest(options, callback);
    },
    addQItemStatus: function (options, callback) {
        options.data = options.status;
        options.verb = "post";
        options.url = "/{chumblr}/chompq/{chompQId}/status";
        makeRestRequest(options, callback);
    },
    getChomps: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/chomps";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    },
    getChomp: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/chomps/{chompId}";
        makeRestRequest(options, callback);
    } ,
    getMergedChomp: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/chomps/{chompId}/merged";
        makeRestRequest(options, callback);
    },

    runChomp: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/chomps/{chompId}/run";
        options.data = options.inputData;
        makeRestRequest(options, callback);
    },
    addChomp: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/chomps";
        options.data = options.chomp;
        makeRestRequest(options, callback);
    },
    updateChomp: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/chomps/{chompId}";
        options.data = options.chomp;
        makeRestRequest(options, callback);
    },
    removeChomp: function (options, callback) {
        options.verb = "del";
        options.url = "/{chumblr}/chomps/{chompId}";
        makeRestRequest(options, callback);
    },
    addScheduledRun: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/chomps/{chompId}/scheduledruns";
        options.data = options.scheduledRun;
        makeRestRequest(options, callback);
    },
    getScheduledRuns: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/chomps/{chompId}/scheduledruns";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    },
    getRunQ: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/chomps/{chompId}/runq";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    }
};
