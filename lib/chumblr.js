'use strict';
var chumblRequest=require("./chumbl-request.js");
var queryBuilder = require('./query-builder');
module.exports = {
    createChumblr: function (options, callback) {
        options.url = queryBuilder("/admin/chumblrs", options);
        options.verb = "post";
        options.data = options.chumblr || options.data;
        options.errorIfNoResult=false;
        chumblRequest(options, callback);
    },
    getChumblrs: function (options, callback) {
        options.url = queryBuilder("/admin/chumblrs", options);
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getChumblr: function (options, callback) {
        options.url = queryBuilder("/admin/chumblrs/{chumblrId}", options);
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getChumblrConfig: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/admin/config", options);
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    }
};