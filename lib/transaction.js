'use strict';
var chumblRequest=require("./chumbl-request.js");
module.exports = {
    saveTransaction: function (options, callback) {

        options.data = options.transaction;
        options.verb = "post";
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}";
        chumblRequest(options, callback);

    },
    getTransaction: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{id}";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getTransactions: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getAllTransactions: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getAllTransactionsForEntity: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/{entityId}";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getAllTransactionsForType: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getAllTransactionsAggregate: function (options, callback) {
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
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getTransactionsAggregateForEntity: function (options, callback) {
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
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getTransactionsAggregateForType: function (options, callback) {
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
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getTransactionsAggregate: function (options, callback) {
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
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getTransactionCount: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/count";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getTransactionCountForType: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/count";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getTransactionCountForEntity: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/{entityId}/count";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getLastTransaction: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/last";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getLastTransactionForType: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/last";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getLastTransactionForEntity: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/{entityId}/last";
        if (options.query) {
            url += "?" + options.query;
        }
        options.verb = "get";
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getTransactionTypes: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/transactiontypes";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    getTransactionType: function (options, callback) {
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}";
        options.verb = "get";
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    addTransactionType: function (options, callback) {
        options.url = "/{chumblr}/transactiontypes";
        options.verb = "post";
        options.data = options.transactionType;
        options.errorIfNoResult=true;
        chumblRequest(options, callback);
    },
    updateTransactionType: function (options, callback) {
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}";
        options.verb = "put";
        options.data = options.transactionType;
        chumblRequest(options, callback);
    },
    removeTransactionType: function (options, callback) {
        console.log('about to remove transaction type ' + JSON.stringify(options));
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}";
        options.verb = "del";
        chumblRequest(options, callback);
    },
    changeTransactionStatus: function (options, callback) {

        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{transactionId}/status/{statusName}";
        options.verb = "put";
        options.data = options.statusData;
        chumblRequest(options, callback);
    },
    enrichTransaction: function (options, callback) {
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{transactionId}";
        options.verb = "patch";
        options.data = options.enrichData;
        chumblRequest(options, callback);
    }
};