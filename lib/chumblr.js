'use strict';
var chumblRequest=require("./chumbl-request.js");
module.exports = {
    createChumblr: function (options, callback) {
        var url = "/admin/chumblrs";
        options.verb = "post";
        options.url = url;
        if (options.chumblr) {
            options.data = options.chumblr;
        }
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getChumblrs: function (options, callback) {
        var url = "/admin/chumblrs";
        options.verb = "get";

        if (options.query) {
            url = url + "?" + options.query;
        }
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getChumblr: function (options, callback) {
        var url = "/admin/chumblrs/{chumblrId}";
        options.verb = "get";

        if (options.query) {
            url = url + "?" + options.query;
        }
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getChumblrConfig: function (options, callback) {
        var url = "/{chumblr}/admin/config";
        options.verb = "get";

        if (options.query) {
            url = url + "?" + options.query;
        }
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    }
};