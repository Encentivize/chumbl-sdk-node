'use strict';
var _ = require('lodash');
var s = require('underscore.string');
var queryString = require('query-string');
var moment = require('moment');
module.exports = function build(url, options) {
    if (s.isBlank(url)) {
        throw new Error("Can't pass an empty url to the query-builder.build method");
    }
    if (!options) {
        throw new Error("Options must be supplied to the query-builder.build method");
    }
    if (typeof options !== 'object') {
        throw new Error("Options must be an object");
    }
    if (url.indexOf('{targetDate}' >= 0)) {
        if (options && options.targetDate) {
            if (!_.isDate(options.targetDate)) {
                var parsed = moment(new Date(options.targetDate));
                if (parsed.isValid()) {
                    options.targetDate = parsed.toISOString();
                } else {
                    throw new Error("target date (" + options.targetDate.toString() + ") was not a valid date");
                }
            } else {
                options.targetDate = options.targetDate.toISOString();
            }
        }
        else {
            url = url.replace("{targetDate}", "");
        }
    }
    if (options.query || options.rawQuery || options.aggregate || options.metrics) {
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
            url = addQueryParamToUrl(url, "aggregate=" + options.aggregate);
        }
        if (options.metrics) {
            if (_.isString(options.metrics)) {
                url = addQueryParamToUrl(url, "metrics=" + options.metrics);
            } else if (_.isArray(options.metrics)) {
                options.metrics.forEach(function (metric) {
                    if (!_.isString(metric)) {
                        throw new Error("metrics in the array must be a string");
                    }
                });
                url = addQueryParamToUrl(url, "metrics=" + options.metrics.join(","));
            } else {
                throw new Error('Unknown type for options.metrics, only string and string array are supported');
            }
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