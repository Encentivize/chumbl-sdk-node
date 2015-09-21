'use strict';
//todo need to clean this up spectacularly :(

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

module.exports = makeRestRequest;
