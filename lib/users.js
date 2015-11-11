'use strict';
var chumblRequest=require("./chumbl-request.js");
var queryBuilder = require('./query-builder');
module.exports = {
    getUsers: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/admin/users";
        options.url = queryBuilder(url, options);
        options.errorIfNoResult=true;
        chumblRequest(options, callback);

    },
    getUser: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/admin/users/{username}";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    addUser: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/admin/users";
        options.data = options.user || options.data;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },

    generateToken: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/admin/users/generateToken";
        options.data = options.user || options.data;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    }
};