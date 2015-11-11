'use strict';
var _ = require('lodash');
var s = require('underscore.string');
module.exports = function build(url, options) {
    if (s.isBlank(url)) {
        throw new Error("Can't pass an empty url to the query-builder.build method");
    }
    if (!options) {
        return url;
    }
    if (options.query || options.rawQuery) {
        if (s.endsWith(url, '/')) {
            url = url.substring(0, url.length - 1);
        }
        if (url.indexOf('?') < 0) {
            url += "?";
        }
        if (options.query) {
            url = addQueryParamToUrl(url, options.query);
        }
        if (options.rawQuery) {
            url = addQueryParamToUrl(url, "rawQuery=" + JSON.stringify(options.rawQuery));
        }
    }
    return url;
};

function addQueryParamToUrl(url, queryParam) {
    if (s.endsWith(url, '?') || s.endsWith(url, '&')) {
        url += queryParam;
        return url;
    }
    url += '&' + queryParam;
    return url;
}