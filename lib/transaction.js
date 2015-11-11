'use strict';
var chumblRequest = require("./chumbl-request.js");
var queryBuilder = require('./query-builder');

module.exports = {
    saveTransaction: function (options, callback) {
        options.data = options.transaction;
        options.verb = "post";
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransaction: function (options, callback) {
        options.verb = "get";
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{id}";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactions: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getAllTransactions: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getAllTransactionsForEntity: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/{entityId}";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getAllTransactionsForType: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getAllTransactionsAggregate: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/aggregate";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionsAggregateForEntity: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/{entityId}/aggregate";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionsAggregateForType: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/aggregate";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionsAggregate: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/aggregate";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionCount: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/count";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionCountForType: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/count";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionCountForEntity: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/{entityId}/count";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getLastTransaction: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/last";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getLastTransactionForType: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/{transactionTypeId}/transactions/last";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getLastTransactionForEntity: function (options, callback) {
        var url = "/{chumblr}/transactiontypes/transactions/{entityId}/last";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionTypes: function (options, callback) {
        options.verb = "get";
        var url = "/{chumblr}/transactiontypes";
        options.url = queryBuilder(url, options);
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionType: function (options, callback) {
        options.url = "/{chumblr}/transactiontypes/{transactionTypeId}";
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addTransactionType: function (options, callback) {
        options.url = "/{chumblr}/transactiontypes";
        options.verb = "post";
        options.data = options.transactionType;
        options.errorIfNoResult = true;
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