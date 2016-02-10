'use strict';

var chumblRequest=require("./chumbl-request.js");
var queryBuilder = require('./query-builder');

module.exports = {
    getGroups: getGroups,
    getMemberGroups: getMemberGroups,
    getGroup: getGroup,
    addGroup: addGroup,
    updateGroup: updateGroup,
    removeGroup: removeGroup,
    getGroupMembers: getGroupMembers,
    getGroupMember: getGroupMember,
    addFixedGroupMember: addFixedGroupMember,
    setFixedGroupMember: setFixedGroupMember,
    removeFixedGroupMember: removeFixedGroupMember
};

function getGroups(options, callback) {
    options.url = queryBuilder("/{chumblr}/groups", options);
    options.verb = "get";
    chumblRequest(options, callback);
}

function getMemberGroups(options, callback) {
    options.url = queryBuilder("/{chumblr}/groups/members/{memberId}", options);
    options.verb = "get";
    chumblRequest(options, callback);
}

function getGroup(options, callback) {
    options.url = queryBuilder("/{chumblr}/groups/{groupId}", options);
    options.verb = "get";
    chumblRequest(options, callback);
}

function addGroup(options, callback) {
    options.url = queryBuilder("/{chumblr}/groups", options);
    options.verb = "post";
    chumblRequest(options, callback);
}

function updateGroup(options, callback) {
    options.url = queryBuilder("/{chumblr}/groups/{groupId}", options);
    options.verb = "put";
    chumblRequest(options, callback);
}

function removeGroup(options, callback) {
    options.url = queryBuilder("/{chumblr}/groups/{groupId}", options);
    options.verb = "del";
    chumblRequest(options, callback);
}

function getGroupMembers(options, callback) {
    options.url = queryBuilder("/{chumblr}/groups/{groupId}/members", options);
    options.verb = "get";
    chumblRequest(options, callback);
}

function getGroupMember(options, callback) {
    options.url = queryBuilder("/{chumblr}/groups/{groupId}/members/{memberId}", options);
    options.verb = "get";
    chumblRequest(options, callback);
}

function addFixedGroupMember(options, callback) {
    options.url = queryBuilder("/{chumblr}/groups/{groupId}/members", options);
    options.verb = "post";
    chumblRequest(options, callback);
}

function setFixedGroupMember(options, callback) {
    options.url = queryBuilder("/{chumblr}/groups/{groupId}/members/{memberId}", options);
    options.verb = "put";
    chumblRequest(options, callback);
}

function removeFixedGroupMember(options, callback) {
    options.url = queryBuilder("/{chumblr}/groups/{groupId}/members/{memberId}", options);
    options.verb = "del";
    chumblRequest(options, callback);
}
