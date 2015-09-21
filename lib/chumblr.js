'use strict';
var makeRestRequest = require('./make-rest-request');
module.exports = {
    createChumblr: function (options, callback) {
        var url = "/admin/chumblrs";
        options.verb = "post";
        options.url = url;
        if (options.chumblr) {
            options.data = options.chumblr;
        }
        makeRestRequest(options, callback);
    },

    getChumblrs: function (options, callback) {
        var url = "/admin/chumblrs";
        options.verb = "get";

        if (options.query) {
            url = url + "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    },

    getChumblr: function (options, callback) {
        var url = "/admin/chumblrs/{chumblrId}";
        options.verb = "get";

        if (options.query) {
            url = url + "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    },

    getChumblrConfig: function (options, callback) {
        var url = "/{chumblr}/admin/config";
        options.verb = "get";

        if (options.query) {
            url = url + "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    }
};