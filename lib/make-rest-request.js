'use strict';

var restCall = require("./rest-call.js");
var _baseUrl = null;
var _restService = null;
var _environment = process.env.NODE_ENV || 'development';

(function setBaseUrl() {
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
})();

(function createRestService() {
    _restService = restCall({
        headers: {
            "Content-Type": "application/json"
        },
        baseUrl: _baseUrl
    });
})();

function makeRestRequest(options, callback) {
    if (!options.headers) {
        options.headers = {};
    }

    if (options.token) {
        options.headers.externalauthtoken = options.token;
        options.auth = {
            user: options.token,
            password: "xxxxxx"
        };
    }

    if (!options.auth && options.username && options.password) {
        options.auth = {
            user: options.username,
            password: options.password
        };
    }

    _restService.callRestService(options, serviceCalled);

    function serviceCalled(err, result, statusCode, location) {
        return callback(err, result, statusCode, location);
    }
}

module.exports = makeRestRequest;
