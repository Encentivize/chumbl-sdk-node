//todo need to clean this up spectacularly
var _baseUrl=null;
var _environment =  process.env.NODE_ENV || 'development';
var async=require("async");

if (process.env.CHUMBL_BASE_URL){
    _baseUrl=process.env.CHUMBL_BASE_URL;
}else{
    if (_environment=="development") {
        _baseUrl="http://localhost:1337";
    }else if (_environment=="qa") {
        _baseUrl="http://chumbl-api-qa.azurewebsites.net";
    }else{
        _baseUrl= "https://api.chumbl.com";
    }
}

var krc=require("kwaai-restcall");
var _restService=krc({
    headers:{"Content-Type": "application/json"},
    baseUrl:_baseUrl
});

var libraryChomp={
    getLibraryChomps: function(options,callback){
            options.verb="get";
            var url="/{chumblr}/libraryChomps";
            if (options.query){
                url+="?" + options.query;
            }
            options.url=url;
            makeRestRequest(options,callback);
        },
    getLibraryChomp:function(options,callback){
        options.verb="get";
        options.url="/{chumblr}/libraryChomps/{libraryChompId}";
        makeRestRequest(options,callback);
    }

    ,addLibraryChomp:function(options,callback){
        options.verb="post";
        options.url="/{chumblr}/libraryChomps";
        options.data=options.libraryChomp;
        makeRestRequest(options,callback);
    }

    ,updateLibraryChomp:function(options,callback){
        options.verb="put";
        options.url="/{chumblr}/libraryChomps/{libraryChompId}";
        options.data=options.libraryChomp;
        makeRestRequest(options,callback);
    }
};

var timestore={
    getValues:
        function(options,callback){
            var url="/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metrics/{targetDate}";
            if (!options.targetDate){
                url=url.replace("/{targetDate}","");
            }
            options.verb="get";
            options.url=url;
            if (options.metrics){
                options.query="metrics=" + options.metrics;
            }
            makeRestRequest(options,callback);
        }

    ,getTimeline:
        function(options,callback){
            var metrics="";
            if (options.metrics){metrics=options.metrics.join(",");}
            var url="/{chumblr}/timestores/{timestoreId}/entities/{entityId}/timeline/{startDate}/{endDate}?metrics=" + metrics;
            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,queryEntities:
        function(options,callback){

            var url="/{chumblr}/timestores/{timestoreId}/entities/{targetDate}";
            if (!options.targetDate){
                url=url.replace("/{targetDate}","");
            }
            if (options.query){url+="?"+options.query;}

            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,setValues:
        function(options,callback){
            var url="/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metrics/{targetDate}";
            if (!options.targetDate){
                url=url.replace("/{targetDate}","");
            }
            options.data=options.values;
            options.verb="post";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getAllValuesForTimestore:
        function(options,callback){
            var url="/{chumblr}/timestores/{timestoreId}/metrics/{targetDate}";
            if (!options.targetDate){
                url=url.replace("/{targetDate}","");
            }
            options.verb="get";
            if (options.query){
                url+="?" + options.query;
            }
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getTimestores:
        function(options,callback){
            options.verb="get";
            var url="/{chumblr}/timestores";
            if (options.query){
                url+="?" + options.query;
            }
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getTimestore:function(options,callback){
        options.verb="get";
        options.url="/{chumblr}/timestores/{timestoreId}";
        makeRestRequest(options,callback);
    }

    ,addTimestore:function(options,callback){
        options.verb="post";
        options.url="/{chumblr}/timestores";
        options.data=options.timestore;
        makeRestRequest(options,callback);
    }

    ,updateTimestore:function(options,callback){
        options.verb="put";
        options.url="/{chumblr}/timestores/{timestoreId}";
        options.data=options.timestore;
        makeRestRequest(options,callback);
    }

};

var datastore={
    getDatastoreValue:
        function(options,callback){
            var url="/{chumblr}/datastores/{datastoreId}/values/{identifier}/{targetDate}";
            if (!options.targetDate){
                url=url.replace("{targetDate}","");
            }
            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }


    ,getDatastoreValues:
        function(options,callback){
            var url="/{chumblr}/datastores/{datastoreId}/values";
            if (options.query){
                url+="?" + options.query;
            }
            options.verb="get";
            options.url=url;
            function requestMade(err,result,statusCode,location){

                return callback(err,result,statusCode,location);
            }
            makeRestRequest(options,requestMade);
        }

    ,addDatastoreValue:
        function(options,callback){
            var url="/{chumblr}/datastores/{datastoreId}/values";
            options.verb="post";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,setDatastoreValue:
        function(options,callback){
            var url="/{chumblr}/datastores/{datastoreId}/values/{identifier}/{targetDate}";
            if (!options.targetDate){
                url=url.replace("/{targetDate}","");
            }
            options.verb="put";
            options.url=url;
            makeRestRequest(options,callback);
        }
    ,removeDatastoreValue:
        function(options,callback){
            var url="/{chumblr}/datastores/{datastoreId}/values/{identifier}";
            options.verb="del";
            options.url=url;
            makeRestRequest(options,callback);
        }
    ,getDatastores:
        function(options,callback){
            options.verb="get";
            var url="/{chumblr}/datastores";
            if (options.query){
                url+="?" + options.query;
            }
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getDatastore:function(options,callback){
        options.verb="get";
        options.url="/{chumblr}/datastores/{datastoreId}";
        makeRestRequest(options,callback);
    }


    ,addDatastore:function(options,callback){
        options.verb="post";
        options.url="/{chumblr}/datastores";
        options.data=options.datastore;
        makeRestRequest(options,callback);
    }

    ,updateDatastore:function(options,callback){
        options.verb="put";
        options.url="/{chumblr}/datastores/{datastoreId}";
        options.data=options.datastore;
        makeRestRequest(options,callback);
    }

};

var transaction={
    saveTransaction:
        function(options,callback){

            options.data=options.transaction;
            options.verb="post";
            options.url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}";
            makeRestRequest(options,callback);

        }

    ,getTransaction:
        function(options,callback){
            options.verb="get";
            options.url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{id}";
            makeRestRequest(options,callback);
        }

    ,getTransactions:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}";
            if (options.query){
                url+="?" + options.query;
            }
            options.verb="get";
            options.url=url;
            function requestMade(err,result,statusCode,location){

                return callback(err,result,statusCode,location);
            }
            makeRestRequest(options,requestMade);
        }

    ,getAllTransactions:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/transactions";
            if (options.query){
                url+="?" + options.query;
            }
            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getAllTransactionsForEntity:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/transactions/{entityId}";
            if (options.query){
                url+="?" + options.query;
            }
            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getAllTransactionsForType:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions";
            if (options.query){
                url+="?" + options.query;
            }
            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getAllTransactionsAggregate:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/transactions/aggregate";
            if (options.query){
                url+="?" + options.query;
            }
            else{
                url+="?";
            }

            if (options.rawQuery){
                url+="&" + "rawQuery=" + JSON.stringify(options.rawQuery);
            }
            url+="&" + "aggregate=" + options.aggregate;

            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getTransactionsAggregateForEntity:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/transactions/{entityId}/aggregate";
            if (options.query){
                url+="?" + options.query;
            }
            else{
                url+="?";
            }

            if (options.rawQuery){
                url+="&" + "rawQuery=" + JSON.stringify(options.rawQuery);
            }
            url+="&" + "aggregate=" + options.aggregate;

            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getTransactionsAggregateForType:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions/aggregate";
            if (options.query){
                url+="?" + options.query;
            }
            else{
                url+="?";
            }

            if (options.rawQuery){
                url+="&" + "rawQuery=" + JSON.stringify(options.rawQuery);
            }
            url+="&" + "aggregate=" + options.aggregate;

            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getTransactionsAggregate:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/aggregate";
            if (options.query){
                url+="?" + options.query;
            }
            else{
                url+="?";
            }

            if (options.rawQuery){
                url+="&" + "rawQuery=" + JSON.stringify(options.rawQuery);
            }
            url+="&" + "aggregate=" + options.aggregate;

            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getTransactionCount:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/count";
            if (options.query){
                url+="?" + options.query;
            }
            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getTransactionCountForType:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions/count";
            if (options.query){
                url+="?" + options.query;
            }
            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getTransactionCountForEntity:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/transactions/{entityId}/count";
            if (options.query){
                url+="?" + options.query;
            }
            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getLastTransaction:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/last";
            if (options.query){
                url+="?" + options.query;
            }
            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getLastTransactionForType:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions/last";
            if (options.query){
                url+="?" + options.query;
            }
            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getLastTransactionForEntity:
        function(options,callback){
            var url="/{chumblr}/transactiontypes/transactions/{entityId}/last";
            if (options.query){
                url+="?" + options.query;
            }
            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getTransactionTypes:
        function(options,callback){
            options.verb="get";
            var url="/{chumblr}/transactiontypes";
            if (options.query){
                url+="?" + options.query;
            }
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getTransactionType:function(options,callback){
        options.url="/{chumblr}/transactiontypes/{transactionTypeId}";
        options.verb="get";
        makeRestRequest(options,callback);
    }

    ,addTransactionType:function(options,callback){
        options.url="/{chumblr}/transactiontypes";
        options.verb="post";
        options.data=options.transactionType;
        makeRestRequest(options,callback);
    }

    ,updateTransactionType:function(options,callback){
        options.url="/{chumblr}/transactiontypes/{transactionTypeId}";
        options.verb="put";
        options.data=options.transactionType;
        makeRestRequest(options,callback);
    }

    ,removeTransactionType:function(options,callback){
        console.log('about to remove transaction type ' + JSON.stringify(options));
        options.url="/{chumblr}/transactiontypes/{transactionTypeId}";
        options.verb="del";
        makeRestRequest(options,callback);
    }

    ,changeTransactionStatus:function(options,callback){

        options.url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{transactionId}/status/{statusName}";
        options.verb="put";
        options.data=options.statusData;
        makeRestRequest(options,callback);
    }

    ,enrichTransaction:function(options,callback){
        options.url="/{chumblr}/transactiontypes/{transactionTypeId}/transactions/{entityId}/{transactionId}";
        options.verb="patch";
        options.data=options.enrichData;
        makeRestRequest(options,callback);
    }
};

var lookup={

    getLookups:
        function(options,callback){
            options.verb="get";
            var url="/{chumblr}/lookups";
            if (options.query){
                url+="?" + options.query;
            }
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getLookup:
        function(options,callback){
            if (options.lookupName){
                options.url="/{chumblr}/lookups/{lookupName}";
            }else{
                options.url="/{chumblr}/lookups/{lookupId}";
            }
            options.verb="get";

            makeRestRequest(options,callback);

        }

    ,getLookupValues:
        function(options,callback){
            options.verb="get";
            options.url="/{chumblr}/lookups/{lookupId}/values";
            var retryCnt=5;
            makeRequest();
            function makeRequest(){
                retryCnt--;
                function requestMade(err,result,statusCode){
                    if (err){return callback(err,result,statusCode);}
                    if (!result&&retryCnt>0){
                        console.warn("retrying get lookup");
                        setTimeout(makeRequest,1000);
                    }
                    else{
                        return callback(err,result,statusCode);
                    }
                }

                makeRestRequest(options,requestMade);
            }

        }

    ,getLookupSchema:
        function(options,callback){
            options.verb="get";
            options.url="/{chumblr}/lookups/{lookupId}/schema";
            makeRestRequest(options,callback);
        },

    vLookup:
        function(options,callback){
            var lookupId=null;
            if (options.lookupName){
                lookupId=options.lookupName;
            }else{
                lookupId=options.lookupId;
            }

            function lookupRetrieved(err,lookupTable){
                if (err){
                    return callback(err);
                }
                if (!lookupTable){return callback("lookup table unavailable for vlookup:" + lookupId);}

                function lookupValuesRetrieved(err,lookupValues){
                    if (err){
                        return callback(err);
                    }
                    if (!lookupValues){return callback("lookup table unavailable for vlookup:" + lookupId);}
                    var foundValue=null;
                    for (var i=0;i<lookupValues.length;i++){
                        if (lookupValues[i][options.lookupColumn]===options.value){
                            if (lookupValues[i][options.returnColumn]||lookupValues[i][options.returnColumn]===0){
                                foundValue=lookupValues[i][options.returnColumn];
                            }
                            break;
                        }
                    }
                    return callback(null,foundValue);
                }

                options.lookupId=lookupTable._id.toString();
                lookup.getLookupValues(options,lookupValuesRetrieved);
            }

            lookup.getLookup(options,lookupRetrieved);
        },

    addLookup:
        function(options,callback){
            options.verb="post";
            options.url="/{chumblr}/lookups";
            options.data=options.lookup;
            makeRestRequest(options,callback);
        },

    updateLookup:
        function(options,callback){
            options.verb="put";
            options.url="/{chumblr}/lookups/{lookupId}";
            options.data=options.lookup;
            makeRestRequest(options,callback);
        },

    setLookupValues:
        function(options,callback){
            options.verb="put";
            options.url="/{chumblr}/lookups/{lookupId}/values?noCache=true";
            options.data=options.lookupValues;
            makeRestRequest(options,callback);
        }
};

var chomp={
    getChompQItem:
        function(options,callback){
            options.verb="get";
            options.url="/{chumblr}/chompq/{chompQId}";
            makeRestRequest(options,callback);
        }
    ,addQItemStatus:
        function(options,callback){
            options.data=options.status;
            options.verb="post";
            options.url="/{chumblr}/chompq/{chompQId}/status";
            makeRestRequest(options,callback);
        }

    ,getChomps:
        function(options,callback){
            options.verb="get";
            var url="/{chumblr}/chomps";
            if (options.query){
                url+="?" + options.query;
            }
            options.url=url;
            makeRestRequest(options,callback);
        }
    ,getChomp:function(options,callback){
        options.verb="get";
        options.url="/{chumblr}/chomps/{chompId}";
        makeRestRequest(options,callback);
    }

    ,getMergedChomp:function(options,callback){
        options.verb="get";
        options.url="/{chumblr}/chomps/{chompId}/merged";
        makeRestRequest(options,callback);
    },

    runChomp:function(options,callback){
        options.verb="post";
        options.url="/{chumblr}/chomps/{chompId}/run";
        options.data=options.inputData;
        makeRestRequest(options,callback);
    },

    addChomp:function(options,callback){
        options.verb="post";
        options.url="/{chumblr}/chomps";
        options.data=options.chomp;
        makeRestRequest(options,callback);
    },

    updateChomp:function(options,callback){
        options.verb="put";
        options.url="/{chumblr}/chomps/{chompId}";
        options.data=options.chomp;
        makeRestRequest(options,callback);
    },
    removeChomp:function(options,callback){
        options.verb="del";
        options.url="/{chumblr}/chomps/{chompId}";
        makeRestRequest(options,callback);
    },

    addScheduledRun:function(options,callback){
        options.verb="post";
        options.url="/{chumblr}/chomps/{chompId}/scheduledruns";
        options.data=options.scheduledRun;
        makeRestRequest(options,callback);
    },

    getScheduledRuns:function(options,callback){
        options.verb="get";
        var url="/{chumblr}/chomps/{chompId}/scheduledruns";
        if (options.query){
            url+="?" + options.query;
        }
        options.url=url;
        makeRestRequest(options,callback);
    },
    getRunQ:function(options,callback){
        options.verb="get";
        var url="/{chumblr}/chomps/{chompId}/runq";
        if (options.query){
            url+="?" + options.query;
        }
        options.url=url;
        makeRestRequest(options,callback);
    }

};

var variables={
    getVariables:
        function(options,callback){
            options.verb="get";
            var url="/{chumblr}/variables";
            if (options.query){
                url+="?" + options.query;
            }
            options.url=url;
            makeRestRequest(options,callback);

        }

    ,getVariable:
        function(options,callback){
            options.url="/{chumblr}/variables/{variableId}";

            options.verb="get";

            makeRestRequest(options,callback);

        }

    ,getVariableValue:
        function(options,callback){
            options.url="/{chumblr}/variables/{variableId}";

            options.verb="get";

            function variableRetrieved(err,variable){
                if (err){return callback(err);}
                if (!variable){return callback(null,null);}
                return callback(null,variable.value);
            }

            variables.getVariable(options,variableRetrieved);

        }

    ,addVariable:
        function(options,callback){
            options.url="/{chumblr}/variables";
            options.verb="post";
            options.data=options.variable;
            makeRestRequest(options,callback);
        }

    ,setVariable:
        function(options,callback){
            options.url="/{chumblr}/variables/{variableId}";
            options.verb="put";
            options.data=options.variable;
            makeRestRequest(options,callback);
        }

};

var users={
    getUsers:function(options,callback){
        options.verb="get";
        var url="/{chumblr}/admin/users";
        if (options.query){
            url+="?" + options.query;
        }
        options.url=url;
        makeRestRequest(options,callback);

    },
    getUser:function(options,callback){
        options.verb="get";
        options.url="/{chumblr}/admin/users/{username}";
        makeRestRequest(options,callback);
    },
    addUser:function(options,callback){
        options.verb="post";
        options.url="/{chumblr}/admin/users";
        options.data=options.user;
        makeRestRequest(options,callback);
    },

    generateToken:function(options,callback){
        options.verb="post";
        options.url="/{chumblr}/admin/users/generateToken";
        options.data=options.user;
        makeRestRequest(options,callback);
    }
};

var chumblr = {
    createChumblr: function(options, callback) {
        var url="/admin/chumblrs";
        options.verb="post";
        options.url=url;
        if (options.chumblr){
            options.data=options.chumblr;
        }
        makeRestRequest(options, callback);
    },

    getChumblrs:function(options,callback){
        var url="/admin/chumblrs";
        options.verb="get";

        if (options.query){
            url=url+"?" + options.query;
        }
        options.url=url;
        makeRestRequest(options,callback);
    },

    getChumblr:function(options,callback){
        var url="/admin/chumblrs/{chumblrId}";
        options.verb="get";

        if (options.query){
            url=url+"?" + options.query;
        }
        options.url=url;
        makeRestRequest(options,callback);
    },

    getChumblrConfig:function(options,callback){
        var url="/{chumblr}/admin/config";
        options.verb="get";

        if (options.query){
            url=url+"?" + options.query;
        }
        options.url=url;
        makeRestRequest(options,callback);
    }
};

var inventory = {

    getInventoryItems:function(options,callback){
        var url="/{chumblr}/inventories/{inventoryId}/items";
        if (options.query){
            url+="?" + options.query;
        }
        options.url=url;
        options.verb="get";
        makeRestRequest(options,callback);
    },

    getInventories:function(options,callback){
        var url="/{chumblr}/inventories";
        if (options.query){
            url+="?" + options.query;
        }
        options.url=url;
        options.verb="get";
        makeRestRequest(options,callback);
    },

    getInventoryItemsForEntity:function(options,callback){
        var url="/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items";
        options.verb="get";
        if (options.query){
            url+="?" + options.query;
        }
        options.url=url;
        makeRestRequest(options,callback);
    },

    getInventoryItem:function(options,callback){
        options.url="/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}";
        options.verb="get";
        makeRestRequest(options,callback);
    },

    addInventoryItem:function(options,callback){
        options.url="/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items";
        options.verb="post";
        options.data=options.inventoryItem;
        makeRestRequest(options,callback);
    },

    changeInventoryItemStatus:function(options,callback){

        options.url="/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/status/{statusName}";
        options.verb="put";
        options.data=options.statusData;
        makeRestRequest(options,callback);
    },

    lockRandomInventoryItem:function(options,callback){
        var url="/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/randomLock";
        if (options.query){
            url+="?" + options.query;
        }
        options.url=url;

        options.verb="put";
        options.data=options.lockData;
        makeRestRequest(options,callback);
    },

    transferInventoryItem:function(options,callback){
        var url="/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/{itemId}/{toInventoryId}/{toEntityId}";
        if (options.query){
            url+="?" + options.query;
        }
        options.url=url;
        options.verb="put";
        options.data=options.transferData;
        makeRestRequest(options,callback);
    },

    getInventory:function(options,callback){
        options.url="/{chumblr}/inventories/{inventoryId}";
        options.verb="get";
        makeRestRequest(options,callback);
    }

    ,addInventory:function(options,callback){
        options.url="/{chumblr}/inventories";
        options.verb="post";
        options.data=options.inventory;
        makeRestRequest(options,callback);
    }

    ,updateInventory:function(options,callback){
        options.url="/{chumblr}/inventories/{inventoryId}";
        options.verb="put";
        options.data=options.inventory;
        makeRestRequest(options,callback);
    },

    getInventoryItemsCountForEntity:function(options,callback){
        var url="/{chumblr}/inventories/{inventoryId}/entities/{entityId}/items/count";
        options.verb="get";
        if (options.query){
            url+="?" + options.query;
        }
        options.url=url;
        makeRestRequest(options,callback);
    },

    getInventoryItemCount:function(options,callback){
        var url="/{chumblr}/inventories/{inventoryId}/items/count";
        options.verb="get";
        if (options.query){
            url+="?" + options.query;
        }
        options.url=url;
        makeRestRequest(options,callback);
    }

};

var configServices={
    configLoader:function(chumblrOptions){
        return new configCreator(chumblrOptions);
    },
    functionBiteToString:function(bites){
        for (var j=0;j<bites.length;j++){
            if(!bites[j].bite){continue;}
            var biteString=bites[j].bite.toString().replace("function (backpack,res,next){","").replace("/*xxxxx*/}","");
            try{
                /*jslint evil: true */
                var fn=new Function("backpack", "res", "next",biteString);
            }catch(exp){
                return callback("error on:" +  item.name + ":" + exp.message);
            }
            bites[j].bite=biteString;
        }
        return bites;
    },
    copyProgramme:function(copyOptions,callback){
        function configRetrieved(err,config,statusCode){
            if (err){return callback(err);}
            function toChumblrRetrieved(err,toChumblr,statusCode){
                if (err&&statusCode!=404){
                    return callback(err);
                }
                if (statusCode!=404){
                    return callback("To Chumblr Exists");
                }

                function chumblrCreated(err,createdChumblr,statusCode){
                    if (err){return callback(err);}
                    var configLoader=new configCreator({
                        chumblr:copyOptions.toChumblr.name,
                        username:copyOptions.toChumblr.adminUser.username,
                        password:copyOptions.toChumblr.adminUser.password
                    });

                    function configLoaded(err,configResult){
                        if (err){
                            return callback(err);
                        }
                        return callback(null,{
                            createdChumblr:createdChumblr,
                            configResult:configResult
                        });
                    }
                    configLoader.processConfig(config,configLoaded);
                }

                chumblr.createChumblr({
                    username:copyOptions.adminCredentials.username,
                    password:copyOptions.adminCredentials.password,
                    chumblr:copyOptions.toChumblr
                },chumblrCreated);

            }

            chumblr.getChumblr({
                username:copyOptions.adminCredentials.username,
                password:copyOptions.adminCredentials.password,
                chumblrId:copyOptions.toChumblr.name
            },toChumblrRetrieved);

        }
        chumblr.getChumblrConfig({
            chumblr:copyOptions.fromChumblr.chumblr,
            username:copyOptions.fromChumblr.username,
            password:copyOptions.fromChumblr.password
        },configRetrieved);
    }
};

var api=
{
    timestore:timestore,
    timestores:timestore,
    transaction:transaction,
    transactions:transaction,
    chomp:chomp,
    chomps:chomp,
    lookup:lookup,
    lookups:lookup,
    variables:variables,
    users:users,
    datastores:datastore,
    datastore:datastore,
    chumblr: chumblr,
    chumblrs: chumblr,
    libraryChomp: libraryChomp,
    libraryChomps: libraryChomp,
    inventory:inventory,
    inventories:inventory,
    configServices:configServices
};


module.exports=api;

function makeRestRequest(options,callback){

    if (!options.headers){options.headers={};}

    if (options.token){
        options.headers.externalauthtoken=options.token;
        options.auth={user:options.token,password:"xxxxxx"};
    }if (!options.auth && options.username && options.password){
        options.auth={user:options.username,password:options.password};
    }

    function serviceCalled(err,result,statusCode,location){
        return callback(err,result,statusCode,location);
    }

    _restService.callRestService(options,serviceCalled);
}

function configCreator(chumblrOptions){
    this.processConfig=processConfig;
    function processConfig(config,callback){
        var results=[];

        function configProcessed(err){
            if(err){
                return callback(err);
            }
            return callback(null,results);
        }

        async.series([
            function(callback){
                processVariables(config.variables,function(err,result){
                    results=results.concat(result);
                    return callback(null);
                });

            },
            function(callback){
                processInventories(config.inventories,function(err,result){
                    results=results.concat(result);
                    return callback(null);
                });
            },
            function(callback){
                processTransactionTypes(config.transactionTypes,function(err,result){
                    results=results.concat(result);
                    return callback(null);
                });
            },
            function(callback){
                processTimestores(config.timestores,function(err,result){
                    results=results.concat(result);
                    return callback(null);
                });
            },
            function(callback){
                processDatastores(config.datastores,function(err,result){
                    results=results.concat(result);
                    return callback(null);
                });
            },
            function(callback){
                processLookups(config.lookups,function(err,result){
                    results=results.concat(result);
                    return callback(null);
                });
            },
            function(callback){
                processLookupValues(config.lookupValues,function(err,result){
                    results=results.concat(result);
                    return callback(null);
                });
            },
            function(callback){
                processLibraryChomps(config.libraryChomps,function(err,result){
                    results=results.concat(result);
                    return callback(null);
                });
            },
            function(callback){
                processChomps(config.chomps,function(err,result){
                    results=results.concat(result);
                    return callback(null);
                });
            }


        ],configProcessed);

    }

    this.processVariables=processVariables;
    function processVariables(items,callback){
        processConfigElements({
            chumblr:chumblrOptions,
            configData:items,
            name:"variables",
            idFieldName:"variableId",
            dataFieldName:"variable",
            itemGetter:variables.getVariable,
            itemCreator:variables.addVariable,
            itemUpdater:variables.setVariable
        },callback);
    }


    this.processInventories=processInventories;
    function processInventories(items,callback){
        processConfigElements({
            chumblr:chumblrOptions,
            configData:items,
            name:"inventory",
            idFieldName:"inventoryId",
            dataFieldName:"inventory",
            itemGetter:inventory.getInventory,
            itemCreator:inventory.addInventory,
            itemUpdater:inventory.updateInventory
        },callback);
    }

    this.processTransactionTypes=processTransactionTypes;
    function processTransactionTypes(items,callback){
        processConfigElements({
            chumblr:chumblrOptions,
            configData:items,
            name:"transactionType",
            idFieldName:"transactionTypeId",
            dataFieldName:"transactionType",
            itemGetter:transaction.getTransactionType,
            itemCreator:transaction.addTransactionType,
            itemUpdater:transaction.updateTransactionType
        },callback);
    }

    this.processTimestores=processTimestores;
    function processTimestores(items,callback){
        processConfigElements({
            chumblr:chumblrOptions,
            configData:items,
            name:"timestore",
            idFieldName:"timestoreId",
            dataFieldName:"timestore",
            itemGetter:timestore.getTimestore,
            itemCreator:timestore.addTimestore,
            itemUpdater:timestore.updateTimestore
        },callback);
    }

    this.processDatastores=processDatastores;
    function processDatastores(items,callback){
        processConfigElements({
            chumblr:chumblrOptions,
            configData:items,
            name:"datastore",
            idFieldName:"datastoreId",
            dataFieldName:"datastore",
            itemGetter:datastore.getDatastore,
            itemCreator:datastore.addDatastore,
            itemUpdater:datastore.updateDatastore
        },callback);
    }

    this.processLookups=processLookups;
    function processLookups(items,callback){
        processConfigElements({
            chumblr:chumblrOptions,
            configData:items,
            name:"lookups",
            idFieldName:"lookupId",
            dataFieldName:"lookup",
            itemGetter:lookup.getLookup,
            itemCreator:lookup.addLookup,
            itemUpdater:lookup.updateLookup
        },callback);
    }

    this.processLookupValues=processLookupValues;
    function processLookupValues(lookupValues,callback){
        var results=[];

        function lookupValuesProcessed(err) {
            if (err) {
                results.push({
                    type:"lookupValues",
                    action:"lookup values update complete with errors",
                    error:err
                });

            } else {
                results.push({
                    type:"lookupValues",
                    action:"lookup values update complete"
                });
            }
            return callback(null,results);
        }

        function processLookupValue(item,itemCallback){
            var lookupOptions={
                chumblr:chumblrOptions.chumblr,
                username:chumblrOptions.username,
                password:chumblrOptions.password,
                lookupId:item.name,
                lookupValues:item
            };
            function lookupValueUpdated(err,result,statusCode){
                if (err){
                    results.push({
                        type:"lookupValues",
                        action:"error",
                        name:item.name,
                        status:statusCode,
                        error:err
                    });
                    return itemCallback();
                }
                results.push({
                    type:"lookupValues",
                    action:"updated",
                    name:item.name,
                    status:statusCode
                });
                return itemCallback();
            }
            lookup.setLookupValues(lookupOptions,lookupValueUpdated);
        }
        async.each(lookupValues,processLookupValue,lookupValuesProcessed);
    }

    this.processLibraryChomps=processLibraryChomps;
    function processLibraryChomps(items,callback){
        processConfigElements({
            chumblr:chumblrOptions,
            configData:items,
            name:"libraryChomp",
            idFieldName:"libraryChompId",
            dataFieldName:"libraryChomp",
            itemGetter:libraryChomp.getLibraryChomp,
            itemCreator:libraryChomp.addLibraryChomp,
            itemUpdater:libraryChomp.updateLibraryChomp
        },callback);
    }

    this.processChomps=processChomps;
    function processChomps(items,callback){
        processConfigElements({
            chumblr:chumblrOptions,
            configData:items,
            name:"chomp",
            idFieldName:"chompId",
            dataFieldName:"chomp",
            itemGetter:chomp.getChomp,
            itemCreator:chomp.addChomp,
            itemUpdater:chomp.updateChomp
        },callback);
    }

    function processConfigElements(options,callback){
        var results=[];
        function configElementsProcessed(err){
            if (err){
                results.push({
                    type:options.name + " update error",
                    action:"error",
                    error:err
                });
            }else{
                results.push({
                    type:options.name,
                    action: options.name + " update complete"
                });
            }
            return callback(null,results);
        }

        function processConfigElement(item,itemCallback){
            function configElementRetrieved(err,result,statusCode){
                if(err&&statusCode!=404){
                    results.push({
                        type:options.name,
                        action:"error",
                        name:item.name,
                        status:statusCode,
                        error:err
                    });
                    return itemCallback();
                }
                if (statusCode!=404){
                    var updateOptions={
                        chumblr:options.chumblr.chumblr,
                        username:options.chumblr.username,
                        password:options.chumblr.password
                    };
                    updateOptions[options.idFieldName]=item.name;
                    updateOptions[options.dataFieldName]=item;
                    options.itemUpdater(updateOptions,itemUpdated);
                }else{
                    var createOptions={
                        chumblr:options.chumblr.chumblr,
                        username:options.chumblr.username,
                        password:options.chumblr.password
                    };
                    createOptions[options.idFieldName]=null;
                    createOptions[options.dataFieldName]=item;
                    options.itemCreator(createOptions,itemCreated);
                }

                function itemCreated(err){
                    if(err){
                        results.push({
                            type:options.name,
                            action:"error",
                            name:item.name,
                            status:statusCode,
                            error:err
                        });
                        return itemCallback();

                    }
                    results.push({
                        type:options.name,
                        action:"created",
                        name:item.name,
                        status:statusCode,
                        error:err
                    });
                    return itemCallback();
                }

                function itemUpdated(err){
                    if(err){
                        results.push({
                            type:options.name,
                            action:"error",
                            name:item.name,
                            status:statusCode,
                            error:err
                        });
                        return itemCallback();
                    }

                    results.push({
                        type:options.name,
                        action:"updated",
                        name:item.name,
                        status:statusCode,
                        error:err
                    });
                    return itemCallback();
                }
            }

            var getOptions={
                chumblr:options.chumblr.chumblr,
                username:options.chumblr.username,
                password:options.chumblr.password
            };
            getOptions[options.idFieldName]=item.name;
            options.itemGetter(getOptions,configElementRetrieved);
        }

        async.each(options.configData,processConfigElement,configElementsProcessed);
    }
}

