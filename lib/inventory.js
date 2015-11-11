'use strict';
var chumblRequest = require("./chumbl-request.js");
var queryBuilder = require('./query-builder');
module.exports = {
    getInventoryItems: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/items";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getInventories: function (options, callback) {
        var url = "/{chumblr}/inventories";
        options.url = queryBuilder(url, options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getInventoryItemsForEntity: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items";
        options.verb = "get";
        options.url = queryBuilder(url, options);
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getInventoryItem: function (options, callback) {
        options.url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}";
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addInventoryItem: function (options, callback) {
        options.url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items";
        options.verb = "post";
        options.data = options.inventoryItem || options.data;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    changeInventoryItemStatus: function (options, callback) {
        options.url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/status/{statusName}";
        options.verb = "put";
        options.data = options.statusData || options.data;
        chumblRequest(options, callback);
    },
    lockRandomInventoryItem: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/randomLock";
        options.url = queryBuilder(url, options);
        options.verb = "put";
        options.data = options.lockData || options.data;
        chumblRequest(options, callback);
    },
    transferInventoryItem: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/{toInventoryId}/{toEntityId}";
        options.url = queryBuilder(url, options);
        options.verb = "put";
        options.data = options.transferData || options.data;
        chumblRequest(options, callback);
    },
    transferOwership: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/{toEntityId}";
        options.url = queryBuilder(url, options);
        options.verb = "put";
        options.data = options.transferOwnerData || options.data;
        chumblRequest(options, callback);
    },
    getInventory: function (options, callback) {
        options.url = "/{chumblr}/inventories/{inventoryId}";
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addInventory: function (options, callback) {
        options.url = "/{chumblr}/inventories";
        options.verb = "post";
        options.data = options.inventory || options.data;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    updateInventory: function (options, callback) {
        options.url = "/{chumblr}/inventories/{inventoryId}";
        options.verb = "put";
        options.data = options.inventory || options.data;
        chumblRequest(options, callback);
    },
    getInventoryItemsCountForEntity: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/count";
        options.verb = "get";
        options.url = queryBuilder(url, options);
        chumblRequest(options, callback);
    },
    getInventoryItemCount: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/items/count";
        options.verb = "get";
        options.url = queryBuilder(url, options);
        chumblRequest(options, callback);
    }

};