'use strict';
var makeRestRequest = require('./make-rest-request');
module.exports = {
    saveTransaction: function (options, callback) {

        options.data = options.transaction;
        options.verb = "post";
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}";
        makeRestRequest(options, callback);

    },
    getTransaction: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{id}";
        makeRestRequest(options, callback);
    },
    getTransactions: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        function requestMade(err, result, statusCode, location) {

            return callback(err, result, statusCode, location);
        }

        makeRestRequest(options, requestMade);
    },
    getAllTransactions: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getAllTransactionsForEntity: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/{entityId}";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getAllTransactionsForType: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getAllTransactionsAggregate: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/aggregate";
        if (options.query) {
            url += "?" + options.query;
        }
        else {
            url += "?";
        }

        if (options.rawQuery) {
            url += "&" + "rawQuery=" + JSON.stringify(options.rawQuery);
        }
        url += "&" + "aggregate=" + options.aggregate;

        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getTransactionsAggregateForEntity: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/{entityId}/aggregate";
        if (options.query) {
            url += "?" + options.query;
        }
        else {
            url += "?";
        }

        if (options.rawQuery) {
            url += "&" + "rawQuery=" + JSON.stringify(options.rawQuery);
        }
        url += "&" + "aggregate=" + options.aggregate;

        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getTransactionsAggregateForType: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/aggregate";
        if (options.query) {
            url += "?" + options.query;
        }
        else {
            url += "?";
        }

        if (options.rawQuery) {
            url += "&" + "rawQuery=" + JSON.stringify(options.rawQuery);
        }
        url += "&" + "aggregate=" + options.aggregate;

        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getTransactionsAggregate: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/aggregate";
        if (options.query) {
            url += "?" + options.query;
        }
        else {
            url += "?";
        }

        if (options.rawQuery) {
            url += "&" + "rawQuery=" + JSON.stringify(options.rawQuery);
        }
        url += "&" + "aggregate=" + options.aggregate;

        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getTransactionCount: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/count";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getTransactionCountForType: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/count";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getTransactionCountForEntity: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/{entityId}/count";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getLastTransaction: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/last";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getLastTransactionForType: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/last";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getLastTransactionForEntity: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/{entityId}/last";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        makeRestRequest(options, callback);
    }, getTransactionTypes: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/transactiontypes";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    }, getTransactionType: function (options, callback) {
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}";
        options.verb = "get";
        makeRestRequest(options, callback);
    }, addTransactionType: function (options, callback) {
        options.url = "/{chumblr}/transactiontypes";
        options.verb = "post";
        options.data = options.transactionType;
        makeRestRequest(options, callback);
    }, updateTransactionType: function (options, callback) {
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}";
        options.verb = "put";
        options.data = options.transactionType;
        makeRestRequest(options, callback);
    }, removeTransactionType: function (options, callback) {
        console.log('about to remove transaction type ' + JSON.stringify(options));
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}";
        options.verb = "del";
        makeRestRequest(options, callback);
    }, changeTransactionStatus: function (options, callback) {

        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{transactionId}/status/{statusName}";
        options.verb = "put";
        options.data = options.statusData;
        makeRestRequest(options, callback);
    }, enrichTransaction: function (options, callback) {
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{transactionId}";
        options.verb = "patch";
        options.data = options.enrichData;
        makeRestRequest(options, callback);
    }
};