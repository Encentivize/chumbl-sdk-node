'use strict';
var chumblRequest=require("./chumbl-request.js");
var variables = {
    getVariables: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/variables";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);


    },
    getVariable: function (options, callback) {
        options.url = "/{chumblr}/variables/{variableId}";
        options.errorIfNoResult=true;
        options.verb = "get";
        chumblRequest(options, callback);

    },
    getVariableValue: function (options, callback) {
        options.url = "/{chumblr}/variables/{variableId}";
        options.verb = "get";
        options.errorIfNoResult=true;

        function variableRetrieved(err, variable,requestResult) {
            if (err) {
                return callback(err,variable,requestResult);
            }
            if (!variable) {
                return callback(null, null,requestResult);
            }
            return callback(null, variable.value,requestResult);
        }

        variables.getVariable(options, variableRetrieved);

    },
    addVariable: function (options, callback) {
        options.url = "/{chumblr}/variables";
        options.verb = "post";
        options.data = options.variable;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    setVariable: function (options, callback) {
        options.url = "/{chumblr}/variables/{variableId}";
        options.verb = "put";
        options.data = options.variable;
        chumblRequest(options, callback);
    }
};

module.exports = variables;