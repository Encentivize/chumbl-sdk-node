'use strict';

var chumblRequest=require("./chumbl-request.js");
var queryBuilder = require('./query-builder');

module.exports = {
    getFixedGroupMember: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/fixedgroups/{fixedGroupId}/members/{memberId}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    getFixedGroupMembers: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/fixedgroups/{fixedGroupId}/members", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    addFixedGroupMember: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/fixedgroups/{fixedGroupId}/members", options);
        options.verb = "post";
        options.data = { memberId: options.memberId };
        chumblRequest(options, callback);
    },
    setFixedGroupMember: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/fixedgroups/{fixedGroupId}/members/{memberId}", options);
        options.verb = "put";
        options.data = { memberId: options.newMemberId };
        chumblRequest(options, callback);
    },
    removeFixedGroupMember: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/fixedgroups/{fixedGroupId}/members/{memberId}", options);
        options.verb = "del";
        chumblRequest(options, callback);
    },

    getFixedGroups: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/fixedgroups", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    getFixedGroup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/fixedgroups/{fixedGroupId}", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    addFixedGroup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/fixedgroups", options);
        options.verb = "post";
        options.data = options.data;
        chumblRequest(options, callback);
    },
    updateFixedGroup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/fixedgroups/{fixedGroupId}", options);
        options.verb = "put";
        options.data = options.data;
        chumblRequest(options, callback);
    },
    removeFixedGroup: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/fixedgroups/{fixedGroupId}", options);
        options.verb = "put";
        options.data = options.data;
        chumblRequest(options, callback);
    }
};
