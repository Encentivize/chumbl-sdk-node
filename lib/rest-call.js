'use strict';
var _ = require("lodash");
var request = require('request');

module.exports = function (globalOptions) {
    return new RestService(globalOptions);
};

function RestService(globalOptions) {

    var self = this;

    var copiedGlobalOptions = _.cloneDeep(globalOptions);

    self.callRestService = function (options, callback) {
        var copiedOptions = _.cloneDeep(options);

        var baseUrl = "";
        if (copiedGlobalOptions.baseUrl) {
            baseUrl = copiedGlobalOptions.baseUrl;
        }
        if (options.baseUrl) {
            baseUrl = options.baseUrl;
        }
        copiedOptions.baseUrl = baseUrl;

        var headers = {};
        if (copiedGlobalOptions.headers) {
            headers = _.cloneDeep(copiedGlobalOptions.headers);
        }
        if (options.headers) {
            _.merge(headers, options.headers);
        }
        copiedOptions.headers = headers;

        var auth = null;
        if (copiedGlobalOptions.auth) {
            auth = _.cloneDeep(copiedGlobalOptions.auth);
        }
        if (options.auth) {
            auth = options.auth;
        }
        copiedOptions.auth = auth;

        return makeRestRequest(copiedOptions, callback);
    };
}


/*
 base options
 @baseUrl: url to prepend to the url. Override global options baseUrl
 @url:url to call with prepended baseUrl if supplied. Any {param} values are replaced with the same name in options.
 @verb: post, get, put,patch, delete,options
 @auth: {username,password} basic http auth. Overrides global auth
 @data: data to send
 @headers: any headers to merge with global headers.
 */

function makeRestRequest(options, callback) {
    var requestOptions = {
        method: options.verb.toUpperCase(),
        headers: {},
        json: true
    };

    if (options.headers) {
        requestOptions.headers = options.headers;
    }
    if (options.auth) {
        requestOptions.auth = options.auth;
    }
    if (options.data) {
        requestOptions.body = options.data;
    }
    if (options.socketPool) {
        requestOptions.pool = options.socketPool;
    }
    if (options.username && options.password) {
        requestOptions.auth = {username: options.username, password: options.password};
    }

    requestOptions.url = parseUrl(options.url, options);

    function apiCalled(response, body) {
        return parseResult(response, body, callback);
    }

    var retryCnt = 6;

    function tryClient() {
        retryCnt--;
        try {
            request[options.verb](requestOptions, function (error, response, body) {
                if (error) {
                    if (retryCnt > 0) {
                        console.warn("retrying api call :" + retryCnt + ":" + options.verb + ":" + requestOptions.url + ":" + JSON.stringify(error));
                        setTimeout(tryClient, 5000);
                    } else {
                        console.error("Error connecting to api", error);
                        return callback('Error connecting to api:' + options.verb + ":" + requestOptions.url + ":" + JSON.stringify(error));
                    }
                } else {
                    apiCalled(response, body);
                }
            });
        } catch (exp) {
            if (retryCnt > 0) {
                console.warn("retrying api call :" + retryCnt + ":" + options.verb + ":" + requestOptions.url + ":" + JSON.stringify(exp));
                setTimeout(tryClient, 5000);
            } else {
                console.error("Error connecting to api", exp);
                return callback("Error connecting to api:" + options.verb + ":" + requestOptions.url + ":" + JSON.stringify(exp));
            }
        }
    }

    tryClient();
}

function parseUrl(url, options) {
    url = options.baseUrl + url;

    for (var property in options) {
        if (options.hasOwnProperty(property)) {
            url = url.replace("{" + property + "}", options[property]);
        }
    }
    return url;
}


function parseResult(response, body, callback) {
    if (response.statusCode >= 500) {
        var errRes = null;
        if (body) {
            errRes = body;
        }
        else {
            errRes = "Server Error";
        }
        return callback(errRes, null, response.statusCode);
    }
    if (response.statusCode === 204) {
        return callback(null, body, response.statusCode);
    }
    if (response.statusCode === 202) {
        var resLocation = null;
        if (response.headers && response.headers.location) {
            resLocation = response.headers.location;
        } else if (response.headers && response.Location) {
            resLocation = response.headers.Location;
        }
        return callback(null, body, response.statusCode, resLocation);
    }
    if (response.statusCode >= 200 && response.statusCode < 300) {
        if (body === "") {
            return callback(null, null, response.statusCode);
        }
        return callback(null, body, response.statusCode);
    }
    var resError;
    if (response.statusCode >= 300 && response.statusCode < 400) {
        resError = "";
        if (body) {
            resError = JSON.stringify(body);
        }
        return callback("Other 300 code:" + resError, body, response.statusCode);
    }
    if (response.statusCode === 404) {
        resError = "";
        if (body) {
            resError = JSON.stringify(body);
        }
        return callback("Not Found:" + resError, body, response.statusCode);
    }
    if (response.statusCode === 401) {
        resError = "";
        if (body) {
            resError = JSON.stringify(body);
        }
        return callback("Not Authorised:" + resError, body, response.statusCode);
    }
    if (response.statusCode === 400) {
        resError = "";
        if (body) {
            resError = JSON.stringify(body);
        }
        return callback("Bad Request:" + resError, body, response.statusCode);
    }
    if (response.statusCode >= 400 && response.statusCode < 500) {
        resError = "";
        if (body) {
            resError = JSON.stringify(body);
        }
        return callback("Other 400 error:" + resError, body, response.statusCode);
    }
    return callback(null, body, response.statusCode);
}