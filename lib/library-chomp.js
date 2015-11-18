'use strict';
var chumblRequest=require("./chumbl-request.js");
var queryBuilder = require('./query-builder');
module.exports = {
    getLibraryChomps: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/libraryChomps", options);
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getLibraryChomp: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/libraryChomps/{libraryChompId}", options);
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    addLibraryChomp: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/libraryChomps", options);
        options.verb = "post";
        options.data = options.libraryChomp || options.data;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    updateLibraryChomp: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/libraryChomps/{libraryChompId}", options);
        options.verb = "put";
        options.data = options.libraryChomp || options.data;
        chumblRequest(options, callback);
    }
};

