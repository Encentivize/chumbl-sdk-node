'use strict';
var makeRestRequest = require('./make-rest-request');
var chumblr = require('./chumblr.js');

module.exports = function (chumblrOptions) {
    this.processConfig = processConfig;
    function processConfig(config, callback) {
        var results = [];

        function configProcessed(err) {
            if (err) {
                return callback(err);
            }
            return callback(null, results);
        }

        async.series([
            function (callback) {
                processVariables(config.variables, function (err, result) {
                    results = results.concat(result);
                    return callback(null);
                });

            },
            function (callback) {
                processInventories(config.inventories, function (err, result) {
                    results = results.concat(result);
                    return callback(null);
                });
            },
            function (callback) {
                processTransactionTypes(config.transactionTypes, function (err, result) {
                    results = results.concat(result);
                    return callback(null);
                });
            },
            function (callback) {
                processTimestores(config.timestores, function (err, result) {
                    results = results.concat(result);
                    return callback(null);
                });
            },
            function (callback) {
                processDatastores(config.datastores, function (err, result) {
                    results = results.concat(result);
                    return callback(null);
                });
            },
            function (callback) {
                processLookups(config.lookups, function (err, result) {
                    results = results.concat(result);
                    return callback(null);
                });
            },
            function (callback) {
                processLookupValues(config.lookupValues, function (err, result) {
                    results = results.concat(result);
                    return callback(null);
                });
            },
            function (callback) {
                processLibraryChomps(config.libraryChomps, function (err, result) {
                    results = results.concat(result);
                    return callback(null);
                });
            },
            function (callback) {
                processChomps(config.chomps, function (err, result) {
                    results = results.concat(result);
                    return callback(null);
                });
            }
        ], configProcessed);
    }

    this.processVariables = processVariables;
    function processVariables(items, callback) {
        processConfigElements({
            chumblr: chumblrOptions,
            configData: items,
            name: "variables",
            idFieldName: "variableId",
            dataFieldName: "variable",
            itemGetter: variables.getVariable,
            itemCreator: variables.addVariable,
            itemUpdater: variables.setVariable
        }, callback);
    }


    this.processInventories = processInventories;
    function processInventories(items, callback) {
        processConfigElements({
            chumblr: chumblrOptions,
            configData: items,
            name: "inventory",
            idFieldName: "inventoryId",
            dataFieldName: "inventory",
            itemGetter: inventory.getInventory,
            itemCreator: inventory.addInventory,
            itemUpdater: inventory.updateInventory
        }, callback);
    }

    this.processTransactionTypes = processTransactionTypes;
    function processTransactionTypes(items, callback) {
        processConfigElements({
            chumblr: chumblrOptions,
            configData: items,
            name: "transactionType",
            idFieldName: "transactionTypeId",
            dataFieldName: "transactionType",
            itemGetter: transaction.getTransactionType,
            itemCreator: transaction.addTransactionType,
            itemUpdater: transaction.updateTransactionType
        }, callback);
    }

    this.processTimestores = processTimestores;
    function processTimestores(items, callback) {
        processConfigElements({
            chumblr: chumblrOptions,
            configData: items,
            name: "timestore",
            idFieldName: "timestoreId",
            dataFieldName: "timestore",
            itemGetter: timestore.getTimestore,
            itemCreator: timestore.addTimestore,
            itemUpdater: timestore.updateTimestore
        }, callback);
    }

    this.processDatastores = processDatastores;
    function processDatastores(items, callback) {
        processConfigElements({
            chumblr: chumblrOptions,
            configData: items,
            name: "datastore",
            idFieldName: "datastoreId",
            dataFieldName: "datastore",
            itemGetter: datastore.getDatastore,
            itemCreator: datastore.addDatastore,
            itemUpdater: datastore.updateDatastore
        }, callback);
    }

    this.processLookups = processLookups;
    function processLookups(items, callback) {
        processConfigElements({
            chumblr: chumblrOptions,
            configData: items,
            name: "lookups",
            idFieldName: "lookupId",
            dataFieldName: "lookup",
            itemGetter: lookup.getLookup,
            itemCreator: lookup.addLookup,
            itemUpdater: lookup.updateLookup
        }, callback);
    }

    this.processLookupValues = processLookupValues;
    function processLookupValues(lookupValues, callback) {
        var results = [];

        function lookupValuesProcessed(err) {
            if (err) {
                results.push({
                    type: "lookupValues",
                    action: "lookup values update complete with errors",
                    error: err
                });

            } else {
                results.push({
                    type: "lookupValues",
                    action: "lookup values update complete"
                });
            }
            return callback(null, results);
        }

        function processLookupValue(item, itemCallback) {
            var lookupOptions = {
                chumblr: chumblrOptions.chumblr,
                username: chumblrOptions.username,
                password: chumblrOptions.password,
                lookupId: item.name,
                lookupValues: item
            };

            function lookupValueUpdated(err, result, statusCode) {
                if (err) {
                    results.push({
                        type: "lookupValues",
                        action: "error",
                        name: item.name,
                        status: statusCode,
                        error: err
                    });
                    return itemCallback();
                }
                results.push({
                    type: "lookupValues",
                    action: "updated",
                    name: item.name,
                    status: statusCode
                });
                return itemCallback();
            }

            lookup.setLookupValues(lookupOptions, lookupValueUpdated);
        }

        async.each(lookupValues, processLookupValue, lookupValuesProcessed);
    }

    this.processLibraryChomps = processLibraryChomps;
    function processLibraryChomps(items, callback) {
        processConfigElements({
            chumblr: chumblrOptions,
            configData: items,
            name: "libraryChomp",
            idFieldName: "libraryChompId",
            dataFieldName: "libraryChomp",
            itemGetter: libraryChomp.getLibraryChomp,
            itemCreator: libraryChomp.addLibraryChomp,
            itemUpdater: libraryChomp.updateLibraryChomp
        }, callback);
    }

    this.processChomps = processChomps;
    function processChomps(items, callback) {
        processConfigElements({
            chumblr: chumblrOptions,
            configData: items,
            name: "chomp",
            idFieldName: "chompId",
            dataFieldName: "chomp",
            itemGetter: chomp.getChomp,
            itemCreator: chomp.addChomp,
            itemUpdater: chomp.updateChomp
        }, callback);
    }

    function processConfigElements(options, callback) {
        var results = [];

        function configElementsProcessed(err) {
            if (err) {
                results.push({
                    type: options.name + " update error",
                    action: "error",
                    error: err
                });
            } else {
                results.push({
                    type: options.name,
                    action: options.name + " update complete"
                });
            }
            return callback(null, results);
        }

        function processConfigElement(item, itemCallback) {
            function configElementRetrieved(err, result, statusCode) {
                if (err && statusCode != 404) {
                    results.push({
                        type: options.name,
                        action: "error",
                        name: item.name,
                        status: statusCode,
                        error: err
                    });
                    return itemCallback();
                }
                if (statusCode != 404) {
                    var updateOptions = {
                        chumblr: options.chumblr.chumblr,
                        username: options.chumblr.username,
                        password: options.chumblr.password
                    };
                    updateOptions[options.idFieldName] = item.name;
                    updateOptions[options.dataFieldName] = item;
                    options.itemUpdater(updateOptions, itemUpdated);
                } else {
                    var createOptions = {
                        chumblr: options.chumblr.chumblr,
                        username: options.chumblr.username,
                        password: options.chumblr.password
                    };
                    createOptions[options.idFieldName] = null;
                    createOptions[options.dataFieldName] = item;
                    options.itemCreator(createOptions, itemCreated);
                }

                function itemCreated(err) {
                    if (err) {
                        results.push({
                            type: options.name,
                            action: "error",
                            name: item.name,
                            status: statusCode,
                            error: err
                        });
                        return itemCallback();

                    }
                    results.push({
                        type: options.name,
                        action: "created",
                        name: item.name,
                        status: statusCode,
                        error: err
                    });
                    return itemCallback();
                }

                function itemUpdated(err) {
                    if (err) {
                        results.push({
                            type: options.name,
                            action: "error",
                            name: item.name,
                            status: statusCode,
                            error: err
                        });
                        return itemCallback();
                    }

                    results.push({
                        type: options.name,
                        action: "updated",
                        name: item.name,
                        status: statusCode,
                        error: err
                    });
                    return itemCallback();
                }
            }

            var getOptions = {
                chumblr: options.chumblr.chumblr,
                username: options.chumblr.username,
                password: options.chumblr.password
            };
            getOptions[options.idFieldName] = item.name;
            options.itemGetter(getOptions, configElementRetrieved);
        }

        async.each(options.configData, processConfigElement, configElementsProcessed);
    }
};