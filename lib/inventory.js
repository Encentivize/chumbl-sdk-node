'use strict';
var makeRestRequest = require('./make-rest-request');
module.exports = {
    getInventoryItems: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/items";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.verb = "get";
        makeRestRequest(options, callback);
    },

    getInventories: function (options, callback) {
        var url = "/{chumblr}/inventories";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.verb = "get";
        makeRestRequest(options, callback);
    },

    getInventoryItemsForEntity: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items";
        options.verb = "get";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    },

    getInventoryItem: function (options, callback) {
        options.url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}";
        options.verb = "get";
        makeRestRequest(options, callback);
    },

    addInventoryItem: function (options, callback) {
        options.url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items";
        options.verb = "post";
        options.data = options.inventoryItem;
        makeRestRequest(options, callback);
    },

    changeInventoryItemStatus: function (options, callback) {

        options.url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/status/{statusName}";
        options.verb = "put";
        options.data = options.statusData;
        makeRestRequest(options, callback);
    },

    lockRandomInventoryItem: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/randomLock";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;

        options.verb = "put";
        options.data = options.lockData;
        makeRestRequest(options, callback);
    },

    transferInventoryItem: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/{toInventoryId}/{toEntityId}";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.verb = "put";
        options.data = options.transferData;
        makeRestRequest(options, callback);
    },

    getInventory: function (options, callback) {
        options.url = "/{chumblr}/inventories/{inventoryId}";
        options.verb = "get";
        makeRestRequest(options, callback);
    },
    addInventory: function (options, callback) {
        options.url = "/{chumblr}/inventories";
        options.verb = "post";
        options.data = options.inventory;
        makeRestRequest(options, callback);
    },
    updateInventory: function (options, callback) {
        options.url = "/{chumblr}/inventories/{inventoryId}";
        options.verb = "put";
        options.data = options.inventory;
        makeRestRequest(options, callback);
    },

    getInventoryItemsCountForEntity: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/count";
        options.verb = "get";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    },

    getInventoryItemCount: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/items/count";
        options.verb = "get";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        makeRestRequest(options, callback);
    }

};