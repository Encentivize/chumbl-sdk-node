'use strict';
var chumblRequest=require("./chumbl-request.js");
module.exports = {
    getLibraryChomps: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/libraryChomps";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getLibraryChomp: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/libraryChomps/{libraryChompId}";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    addLibraryChomp: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/libraryChomps";
        options.data = options.libraryChomp;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    updateLibraryChomp: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/libraryChomps/{libraryChompId}";
        options.data = options.libraryChomp;
        chumblRequest(options, callback);
    }
};

