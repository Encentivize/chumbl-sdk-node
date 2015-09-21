'use strict';
var makeRestRequest = require('./make-rest-request');
module.exports = {
    getLibraryChomps: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/libraryChomps";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    },

    getLibraryChomp: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/libraryChomps/{libraryChompId}";
        makeRestRequest(options, callback);
    }

    , addLibraryChomp: function (options, callback) {
        options.verb = "post";
        options.url = "/{chumblr}/libraryChomps";
        options.data = options.libraryChomp;
        makeRestRequest(options, callback);
    }

    , updateLibraryChomp: function (options, callback) {
        options.verb = "put";
        options.url = "/{chumblr}/libraryChomps/{libraryChompId}";
        options.data = options.libraryChomp;
        makeRestRequest(options, callback);
    }
};

