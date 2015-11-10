'use strict';
var chumblRequest = require("./chumbl-request.js");
module.exports = {
    getInventoryItems: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/items";
        if (options.query) {
            url += "?" + options.query;
        }
        else {
            url += "?";
        }
        if (options.rawQuery) {
            url += "&" + "rawQuery=" + JSON.stringify(options.rawQuery);
        }
        options.url = url;
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getInventories: function (options, callback) {
        var url = "/{chumblr}/inventories";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.verb = "get";
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    getInventoryItemsForEntity: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items";
        options.verb = "get";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
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
        options.data = options.inventoryItem;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    changeInventoryItemStatus: function (options, callback) {

        options.url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/status/{statusName}";
        options.verb = "put";
        options.data = options.statusData;
        chumblRequest(options, callback);
    },
    lockRandomInventoryItem: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/randomLock";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;

        options.verb = "put";
        options.data = options.lockData;
        chumblRequest(options, callback);
    },
    transferInventoryItem: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/{toInventoryId}/{toEntityId}";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.verb = "put";
        options.data = options.transferData;
        chumblRequest(options, callback);
    },
    transferOwership: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/{toEntityId}";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        options.verb = "put";
        options.data = options.transferOwnerData;
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
        options.data = options.inventory;
        options.errorIfNoResult = true;
        chumblRequest(options, callback);
    },
    updateInventory: function (options, callback) {
        options.url = "/{chumblr}/inventories/{inventoryId}";
        options.verb = "put";
        options.data = options.inventory;
        chumblRequest(options, callback);
    },
    getInventoryItemsCountForEntity: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/count";
        options.verb = "get";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        chumblRequest(options, callback);
    },
    getInventoryItemCount: function (options, callback) {
        var url = "/{chumblr}/inventories/{inventoryId}/items/count";
        options.verb = "get";
        if (options.query) {
            url += "?" + options.query;
        }
        options.url = url;
        chumblRequest(options, callback);
    }

};