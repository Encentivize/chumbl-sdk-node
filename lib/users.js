'use strict';
var chumblRequest = require("./chumbl-request.js");
var queryBuilder = require('./query-builder');
module.exports = {
    getUsers: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/admin/users", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);

    },
    getUser: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/admin/users/{username}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addUser: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/admin/users", options);
        options.verb = "post";
        options.data = options.user || options.data;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    generateToken: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/admin/users/generateToken", options);
        options.verb = "post";
        options.data = options.user || options.data;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    }
};