'use strict';
var makeRestRequest = require('./make-rest-request');
module.exports = {
    getUsers: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/admin/users";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);

    },
    getUser: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/admin/users/{username}";
        makeRestRequest(options, callback);
    },
    addUser: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/admin/users";
        options.data = options.user;
        makeRestRequest(options, callback);
    },

    generateToken: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/admin/users/generateToken";
        options.data = options.user;
        makeRestRequest(options, callback);
    }
};