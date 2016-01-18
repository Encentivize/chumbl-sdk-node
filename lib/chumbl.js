'use strict';

var metric = require('./metric');
var libraryChomp = require('./library-chomp.js');
var timestore = require('./timestore.js');
var datastore = require('./datastore.js');
var transaction = require('./transaction.js');
var lookup = require('./lookup.js');
var chomp = require('./chomp.js');
var variables = require('./variables.js');
var users = require('./users.js');
var chumblr = require('./chumblr.js');
var inventory = require('./inventory.js');
var configServices = require('./config-services.js');
var fixedGroups = require('./fixed-groups.js');
var dynamicGroups = require('./dynamic-groups.js');

module.exports = {
    timestore: timestore,
    timestores: timestore,
    transaction: transaction,
    transactions: transaction,
    chomp: chomp,
    chomps: chomp,
    lookup: lookup,
    lookups: lookup,
    variables: variables,
    users: users,
    datastores: datastore,
    datastore: datastore,
    chumblr: chumblr,
    chumblrs: chumblr,
    libraryChomp: libraryChomp,
    libraryChomps: libraryChomp,
    inventory: inventory,
    inventories: inventory,
    configServices: configServices,
    metric: metric,
    metrics: metric,
    fixedGroup: fixedGroups,
    fixedGroups: fixedGroups,
    dynamicGroup: dynamicGroups,
    dynamicGroups: dynamicGroups
};
