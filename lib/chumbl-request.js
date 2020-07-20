'use strict';
var request = require("request");
var _baseUrl = null;
var _environment = process.env.NODE_ENV || 'development';
var async = require('async');
if (process.env.CHUMBL_BASE_URL) {
    _baseUrl = process.env.CHUMBL_BASE_URL;
} else {
    if (_environment === "development") {
        _baseUrl = "http://localhost:1330";
    } else if (_environment === "qa") {
        _baseUrl = "http://chumbl-api-qa-l.cloudapp.net";
    } else {
        _baseUrl = "https://api.chumbl.com";
    }
}

module.exports = function callChumblApi(options, callback) {
    options.verb = options.verb.toLowerCase();
    var requestOptions = {
        method: options.verb.toUpperCase(),
        headers: {
            "Content-Type": "application/json"
        },
        json: true,
        gzip: true
    };
    if (options.etag) {
        requestOptions.headers['if-match'] = options.etag;
    }
    if (options.data) {
        requestOptions.body = options.data;
    }
    if (options.socketPool) {
        requestOptions.pool = options.socketPool;
    }
    setAuthOptions(options, requestOptions);
    requestOptions.url = _baseUrl + parseUrl(options.url, options);

    async.retry({times: 5, interval: 5000}, async.apply(retryableCallApi, requestOptions, options), async.apply(apiCallComplete, requestOptions, options, callback));
};

function retryableCallApi(requestOptions, options, callback) {
    var alwaysRetryableStatusCodes = [502, 503, 504];
    var retryableVerbs = ["get", "put"];
    try {
        request[options.verb](requestOptions, function (error, response, body) {
            var result = {
                error: error,
                response: response,
                body: body
            };
            if (response && alwaysRetryableStatusCodes.indexOf(response.statusCode) >= 0) {
                console.warn(response.statusCode + " error while attempting to call chumbl, retrying. Response body : " + JSON.stringify(body));
                return callback(result);
            }
            if (error || response.statusCode === 500) {
                if (retryableVerbs.indexOf(options.verb) >= 0) {
                    if (error) {
                        console.warn("Error on chumbl call, retrying. Error : " + error.message);
                    } else {
                        console.warn("500 error on chumbl call, retrying. Response body : " + JSON.stringify(body));
                    }
                    return callback(result);
                }
            }
            return callback(null, result);
        });
    } catch (error) {
        //this error is before a connection is made, normally had to do with incorrectly formatted requests.
        var result = {
            error: error,
            response: null,
            body: null
        };
        return callback(null, result);
    }
}

function apiCallComplete(requestOptions, options, callback, error, result) {
    if (error) {
        if (error.message && error.stack) {
            return callback("Error with request object : " + options.verb + " : " + requestOptions.url + " : " + error.message + " ." + error.stack);
        }
        result = {
            error: error.error,
            response: error.response,
            body: error.body
        };
    }
    if (result.error) {
        return callback("Error connecting to api : " + options.verb + " : " + requestOptions.url + " : " + result.error.message + " ." + result.error.stack);
    }
    return parseResult(result.response, result.body, async.apply(responseParsed, options, callback));
}

function responseParsed(options, callback, error, jsonBody, responseAdditionalData) {
    if (!error && !jsonBody && options.errorIfNoResult) {
        error = {
            message: "Expecting body but none returned",
            status: 500
        };
    }
    if (options.useOriginalCallFormat) {
        return callback(error, jsonBody, responseAdditionalData.status, responseAdditionalData.location);
    } else {
        return callback(error, jsonBody, responseAdditionalData);
    }
}

function setAuthOptions(options, requestOptions) {
    var username = (options.auth ? options.auth.username : null) || options.username || (options.auth ? options.auth.user : null) || options.user;
    var password = (options.auth ? options.auth.password : null) || options.password || (options.auth ? options.auth.pass : null) || options.pass;
    if (username && password) {
        requestOptions.auth = {
            user: username,
            password: password
        };
    } else {
        if (options.token) {
            requestOptions.headers.externalauthtoken = options.token;
            requestOptions.auth = {
                user: options.token,
                password: "xxxxxx"
            };
        } else {
            throw new Error("Invalid auth credentials, username (" + username + ") & password (" + password + ") must both have a value or a token (" + options.token + ") must be provided");
        }
    }
}

function parseUrl(url, options) {
    var replaceUrl = url;

    for (var property in options) {
        if (options.hasOwnProperty(property)) {
            replaceUrl = replaceUrl.replace("{" + property + "}", options[property]);
        }
    }
    return replaceUrl;
}

function parseResult(response, body, callback) {
    var code = response.statusCode;
    var jsonBody = null;
    if (typeof body === 'string' || body instanceof String) {
        try {
            jsonBody = JSON.parse(body);
        } catch (error) {
            jsonBody = {
                message: body
            };
        }
    } else {
        jsonBody = body;
    }
    var location = null;
    var etag = null;

    if (response.headers && response.headers.etag) {
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
    if (jsonBody && jsonBody.message) {
        if (!jsonBody.status) {
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
