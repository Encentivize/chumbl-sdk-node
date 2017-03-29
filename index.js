'use strict';

var metric = require('./lib/metric');
var libraryChomp = require('./lib/library-chomp.js');
var timestore = require('./lib/timestore.js');
var timestoreGroup = require('./lib/timestore-group.js');
var datastore = require('./lib/datastore.js');
var transaction = require('./lib/transaction.js');
var lookup = require('./lib/lookup.js');
var chomp = require('./lib/chomp.js');
var variables = require('./lib/variables.js');
var users = require('./lib/users.js');
var chumblr = require('./lib/chumblr.js');
var inventory = require('./lib/inventory.js');
var configServices = require('./lib/config-services.js');
var groups = require('./lib/groups.js');

module.exports = {
    timestore: timestore,
    timestores: timestore,
    timestoreGroup: timestoreGroup,
    timestoreGroups: timestoreGroup,
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
    group: groups,
    groups: groups
};
