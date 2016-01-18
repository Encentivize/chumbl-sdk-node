'use strict';

var chumblRequest=require("./chumbl-request.js");
var queryBuilder = require('./query-builder');

module.exports = {
    getDynamicGroupMember: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/dynamicgroups/{dynamicGroupId}/members/{memberId}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    getDynamicGroupMembers: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/dynamicgroups/{dynamicGroupId}/members", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },

    getDynamicGroups: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/dynamicgroups", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    getDynamicGroup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/dynamicgroups/{dynamicGroupId}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    addDynamicGroup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/dynamicgroups", options);
        options.verb = "post";
        chumblRequest(options, callback);
    },
    updateDynamicGroup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/dynamicgroups/{dynamicGroupId}", options);
        options.verb = "put";
        chumblRequest(options, callback);
    },
    removeDynamicGroup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/dynamicgroups/{dynamicGroupId}", options);
        options.verb = "put";
        chumblRequest(options, callback);
    }
};
