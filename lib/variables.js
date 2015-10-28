'use strict';
var makeRestRequest = require('./make-rest-request');
var variables = {
    getVariables: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/variables";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);

    },
    getVariable: function (options, callback) {
        options.url = "/{chumblr}/variables/{variableId}";

        options.verb = "get";

        makeRestRequest(options, callback);

    },
    getVariableValue: function (options, callback) {
        options.url = "/{chumblr}/variables/{variableId}";

        options.verb = "get";

        function variableRetrieved(err, variable) {
            if (err) {
                return callback(err);
            }
            if (!variable) {
                return callback(null, null);
            }
            return callback(null, variable.value);
        }

        variables.getVariable(options, variableRetrieved);

    },
    addVariable: function (options, callback) {
        options.url = "/{chumblr}/variables";
        options.verb = "post";
        options.data = options.variable;
        makeRestRequest(options, callback);
    },
    setVariable: function (options, callback) {
        options.url = "/{chumblr}/variables/{variableId}";
        options.verb = "put";
        options.data = options.variable;
        makeRestRequest(options, callback);
    }
};

module.exports = variables;