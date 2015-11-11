'use strict';
var _ = require('lodash');
var s = require('underscore.string');
var queryString = require('query-string');
module.exports = function build(url, options) {
    if (s.isBlank(url)) {
        throw new Error("Can't pass an empty url to the query-builder.build method");
    }
    if (!options) {
        return url;
    }
    if (options.query || options.rawQuery || options.aggregate) {
        if (s.endsWith(url, '/')) {
            url = url.substring(0, url.length - 1);
        }
        if (url.indexOf('?') < 0) {
            url += "?";
        }
        if (options.query) {
            if (_.isString(options.query)) {
                url = addQueryParamToUrl(url, options.query);
            } else {
                url = addQueryParamToUrl(url, queryString.stringify(options.query));
            }
        }
        if (options.rawQuery) {
            if (_.isString(options.rawQuery)) {
                url = addQueryParamToUrl(url, "rawQuery=" + options.rawQuery);
            } else {
                url = addQueryParamToUrl(url, "rawQuery=" + JSON.stringify(options.rawQuery));
            }
        }
        if (options.aggregate) {
            if (!_.isString(options.aggregate)) {
                throw new Error('options.aggregate must be a string when calling the chumbl sdk');
            }
            if (options.aggregate.indexOf(':') < 0) {
                throw new Error('no : value was passed into the chumbl sdk when using an aggregate');
            }
            url = addQueryParamToUrl(url, "aggregate=" + options.aggregate)
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