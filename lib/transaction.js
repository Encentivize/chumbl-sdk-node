'use strict';
var chumblRequest = require("./chumbl-request.js");
var queryBuilder = require('./query-builder');

module.exports = {
    saveTransaction: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}", options);
        options.data = options.transaction || options.data;
        options.verb = "post";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransaction: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{id}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactions: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getAllTransactions: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/transactions", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getAllTransactionsForEntity: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/transactions/{entityId}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getAllTransactionsForType: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getAllTransactionsAggregate: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/transactions/aggregate", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionsAggregateForEntity: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/transactions/{entityId}/aggregate", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionsAggregateForType: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions/aggregate", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionsAggregate: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/aggregate", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionCount: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/count", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionCountForType: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions/count", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionCountForEntity: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/transactions/{entityId}/count", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getLastTransaction: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/last", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getLastTransactionForType: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions/last", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getLastTransactionForEntity: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/transactions/{entityId}/last", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionTypes: function (options, callback) {
        options.verb = "get";
        options.url = queryBuilder("/{chumblr}/transactiontypes", options);
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getTransactionType: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addTransactionType: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes", options);
        options.verb = "post";
        options.data = options.transactionType || options.data;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    updateTransactionType: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}", options);
        options.verb = "put";
        options.data = options.transactionType || options.data;
        chumblRequest(options, callback);
    },
    removeTransactionType: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}", options);
        options.verb = "del";
        chumblRequest(options, callback);
    },
    changeTransactionStatus: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{transactionId}/status/{statusName}", options);
        options.verb = "put";
        options.data = options.statusData || options.data;
        chumblRequest(options, callback);
    },
    enrichTransaction: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{transactionId}", options);
        options.verb = "patch";
        options.data = options.enrichData || options.data;
        chumblRequest(options, callback);
    }
};