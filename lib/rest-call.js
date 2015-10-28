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
        } catch (error) {
            if (retryCnt > 0) {
                console.warn("retrying api call :" + retryCnt + ":" + options.verb + ":" + requestOptions.url + ":" + JSON.stringify(error));
                setTimeout(tryClient, 5000);
            } else {
                console.error("Error connecting to api", error);
                return callback("Error connecting to api:" + options.verb + ":" + requestOptions.url + ":" + JSON.stringify(error));
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
    var code = response.statusCode;
    var jsonBody = null;
    if (typeof body === 'string' || body instanceof String) {
        try {
            jsonBody = JSON.parse(body);
        }
        catch (error) {
            console.warn('Response body was not json, constructing one with a message ');
            jsonBody = {
                message: body
            };
        }
    } else {
        jsonBody = body;
    }
    var location = null;
    var etag = null;

    if(response.headers && response.headers.etag)
    {
        etag = response.headers.etag;
    }

    if (response.headers && response.headers.location) {
        location = response.headers.location;
    } else if (response.headers && response.Location) {
        location = response.headers.Location;
    }

    var responseAdditionalData = {status: code, etag: etag, location: location};
    if (code >= 200 && code < 300) {
        return callback(null, jsonBody, responseAdditionalData);
    }
    if(jsonBody && jsonBody.message){
        if(!jsonBody.status){
            jsonBody.status = code;
        }
        return callback(jsonBody, jsonBody, responseAdditionalData);
    }
    var error = {
        status: code,
        message: body
    };
    return callback(error, jsonBody, responseAdditionalData);
}
