
var _baseUrl=null;
var _environment =  process.env.NODE_ENV || 'development';
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
    getLibraryChomps:
        function(options,callback){
            options.verb="get";
            var url="/{chumblr}/libraryChomps";
            if (options.query){
                url+="?" + options.query + "&select=_id,name";
            }
            else{
                url+="?select=_id,name";
            }
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getLibraryChomp:function(options,callback){
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
}

var timestore={
    getValues:
        function(options,callback){
            var url="/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metrics/{targetDate}";
            if (!options.targetDate){url=url.replace("/{targetDate}","")};
            options.verb="get";
            options.url=url;
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
            if (!options.targetDate){url=url.replace("/{targetDate}","")};
            if (options.query){url+="?"+options.query;}

            options.verb="get";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,setValues:
        function(options,callback){
            var url="/{chumblr}/timestores/{timestoreId}/entities/{entityId}/metrics/{targetDate}";
            if (!options.targetDate){url=url.replace("/{targetDate}","")};
            options.data=options.values;
            options.verb="post";
            options.url=url;
            makeRestRequest(options,callback);
        }


    ,getTimestores:
        function(options,callback){
            options.verb="get";
            var url="/{chumblr}/timestores";
            if (options.query){
                url+="?" + options.query + "&select=_id,name";
            }
            else{
                url+="?select=_id,name";
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

}

var datastore={
    getDatastoreValue:
        function(options,callback){
            var url="/{chumblr}/datastores/{datastoreId}/values/{identifier}/{targetDate}";
            if (!options.targetDate){url=url.replace("{targetDate}","")};
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
            options.url=url
            function requestMade(err,result,statusCode,location){

                return callback(err,result,statusCode,location)
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
            if (!options.targetDate){url=url.replace("/{targetDate}","")};
            options.verb="put";
            options.url=url;
            makeRestRequest(options,callback);
        }

    ,getDatastores:
        function(options,callback){
            options.verb="get";
            var url="/{chumblr}/datastores";
            if (options.query){
                url+="?" + options.query + "&select=_id,name";
            }
            else{
                url+="?select=_id,name";
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
        options.data=options.timestore;
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

}

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
            options.url=url
            function requestMade(err,result,statusCode,location){

                return callback(err,result,statusCode,location)
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
            options.url="/{chumblr}/transactiontypes?select=_id,name";
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
}

var lookup={

    getLookups:
        function(options,callback){
            options.verb="get";
            options.url="/{chumblr}/lookups?select=_id,name";
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
                if (err){return callback(err)}
                if (!lookupTable){return callback("lookup table unavailable for vlookup:" + lookupId);}

                function lookupValuesRetrieved(err,lookupValues){
                    if (err){return callback(err)}
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
            options.url="/{chumblr}/lookups/{lookupId}/values";
            options.data=options.lookupValues;
            makeRestRequest(options,callback);
        }
}

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
                url+="?" + options.query + "&select=_id,name";
            }
            else{
                url+="?select=_id,name";
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


}

var variables={
    getVariables:
        function(options,callback){
            options.verb="get";
            options.url="/{chumblr}/variables";
            if (options.query){
                options.url=options.url+"&" + options.query;
            }
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

}

var users={
    getUsers:function(options,callback){
        options.verb="get";
        options.url="/{chumblr}/users";
        makeRestRequest(options,callback);
    },
    getUser:function(options,callback){
        options.verb="get";
        options.url="/{chumblr}/users/{email}";
        makeRestRequest(options,callback);
    },
    addUser:function(options,callback){
        options.verb="post";
        options.url="/{chumblr}/users";
        options.data=options.user;
        makeRestRequest(options,callback);
    },
    updateUser:function(options,callback){
        options.verb="put";
        options.url="/{chumblr}/users/{email}";
        options.data=options.user;
        makeRestRequest(options,callback);
    },
    generateToken:function(options,callback){
        options.verb="post";
        options.url="/{chumblr}/users/generateToken";
        options.data=options.user;
        makeRestRequest(options,callback);
    }
};

var chumblr = {
    createChumblr: function(options, callback) {
        if(!options) throw new Error("options is required");
        if(!options.auth) throw new Error("options.auth is required");
        if(!options.data) throw new Error("data is required");
        if(!options.data.name) throw new Error("data.name is required");
        if(!options.data.title) throw new Error("data.title is required");
        if(!options.data.description) throw new Error("data.description is required");
        if(!options.data.adminUser) throw new Error("data.adminUser is required");
        if(!options.data.adminUser.email) throw new Error("data.adminUser.email is required");
        if(!options.data.adminUser.password) throw new Error("data.adminUser.password is required");

        var reqOptions = {
            verb: "post",
            url: "/admin/chumblrs/",
            data: options.data,
            auth: options.auth
        };
        makeRestRequest(reqOptions, callback);
    }
}

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
    libraryChomps: libraryChomp

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







