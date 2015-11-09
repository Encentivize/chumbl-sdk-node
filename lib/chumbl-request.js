'use strict';
var request = require("request");
var _baseUrl = null;
var _environment = process.env.NODE_ENV || 'development';

if (process.env.CHUMBL_BASE_URL) {
    _baseUrl = process.env.CHUMBL_BASE_URL;
} else {
    if (_environment === "development") {
        _baseUrl = "http://localhost:1337";
    } else if (_environment === "qa") {
        _baseUrl = "http://chumbl-api-qa.azurewebsites.net";
    } else {
        _baseUrl = "https://api.chumbl.com";
    }
}

module.exports = function callChumblApi(options, callback) {
    var requestOptions = {
        method: options.verb.toUpperCase(),
        headers: {
            "Content-Type": "application/json"
        },
        json: true
    };

    if (options.data) {
        requestOptions.body = options.data;
    }

    if (options.socketPool) {
        requestOptions.pool = options.socketPool;
    }

    var username = options.auth.username || options.username || options.auth.user || options.user;
    var password = options.auth.password || options.password || options.auth.pass || options.pass;
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
        }
        else {
            console.warn("Invalid auth credentials, username (" + username + ") & password (" + password + ") must both have a value or a token (" + options.token + ")must be provided");
        }
    }

    requestOptions.url = _baseUrl + parseUrl(options.url, options);

    function apiCalled(response, body) {
        function responseParsed(error, jsonBody, responseAdditionalData) {
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

        return parseResult(response, body, responseParsed);
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

};


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
