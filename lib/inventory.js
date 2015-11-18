'use strict';
var chumblRequest = require("./chumbl-request.js");
var queryBuilder = require('./query-builder');
module.exports = {
    getInventoryItems: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}/items", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getInventories: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getInventoryItemsForEntity: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getInventoryItem: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addInventoryItem: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items", options);
        options.verb = "post";
        options.data = options.inventoryItem || options.data;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    changeInventoryItemStatus: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/status/{statusName}", options);
        options.verb = "put";
        options.data = options.statusData || options.data;
        chumblRequest(options, callback);
    },
    lockRandomInventoryItem: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/randomLock", options);
        options.verb = "put";
        options.data = options.lockData || options.data;
        chumblRequest(options, callback);
    },
    transferInventoryItem: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/{toInventoryId}/{toEntityId}", options);
        options.verb = "put";
        options.data = options.transferData || options.data;
        chumblRequest(options, callback);
    },
    transferOwership: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/{toEntityId}", options);
        options.verb = "put";
        options.data = options.transferOwnerData || options.data;
        chumblRequest(options, callback);
    },
    getInventory: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}", options);
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    addInventory: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories", options);
        options.verb = "post";
        options.data = options.inventory || options.data;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    updateInventory: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}", options);
        options.verb = "put";
        options.data = options.inventory || options.data;
        chumblRequest(options, callback);
    },
    getInventoryItemsCountForEntity: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/count", options);
        options.verb = "get";
        chumblRequest(options, callback);
    },
    getInventoryItemCount: function (options, callback) {
        options.url = queryBuilder("/{chumblr}/inventories/{inventoryId}/items/count", options);
        options.verb = "get";
        chumblRequest(options, callback);
    }

};