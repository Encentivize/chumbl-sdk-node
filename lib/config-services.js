'use strict';
var makeRestRequest = require('./make-rest-request');
var configCreator = require('./config-creator');

module.exports = {
    configLoader: function (chumblrOptions) {
        return new configCreator(chumblrOptions);
    },
    functionBiteToString: function (bites) {
        for (var j = 0; j < bites.length; j++) {
            if (!bites[j].bite) {
                continue;
            }
            var biteString = bites[j].bite.toString().replace("function (backpack,res,next){", "").replace("/*xxxxx*/}", "");
            try {
                /*jslint evil: true */
                var fn = new Function("backpack", "res", "next", biteString);
            } catch (exp) {
                return callback("error on:" + item.name + ":" + exp.message);
            }
            bites[j].bite = biteString;
        }
        return bites;
    },
    copyProgramme: function (copyOptions, callback) {
        function configRetrieved(err, config, statusCode) {
            if (err) {
                return callback(err);
            }
            function toChumblrRetrieved(err, toChumblr, statusCode) {
                if (err && statusCode != 404) {
                    return callback(err);
                }
                if (statusCode != 404) {
                    return callback("To Chumblr Exists");
                }

                function chumblrCreated(err, createdChumblr, statusCode) {
                    if (err) {
                        return callback(err);
                    }
                    var configLoader = new configCreator({
                        chumblr: copyOptions.toChumblr.name,
                        username: copyOptions.toChumblr.adminUser.username,
                        password: copyOptions.toChumblr.adminUser.password
                    });

                    function configLoaded(err, configResult) {
                        if (err) {
                            return callback(err);
                        }
                        return callback(null, {
                            createdChumblr: createdChumblr,
                            configResult: configResult
                        });
                    }

                    configLoader.processConfig(config, configLoaded);
                }

                chumblr.createChumblr({
                    username: copyOptions.adminCredentials.username,
                    password: copyOptions.adminCredentials.password,
                    chumblr: copyOptions.toChumblr
                }, chumblrCreated);

            }

            chumblr.getChumblr({
                username: copyOptions.adminCredentials.username,
                password: copyOptions.adminCredentials.password,
                chumblrId: copyOptions.toChumblr.name
            }, toChumblrRetrieved);

        }

        chumblr.getChumblrConfig({
            chumblr: copyOptions.fromChumblr.chumblr,
            username: copyOptions.fromChumblr.username,
            password: copyOptions.fromChumblr.password
        }, configRetrieved);
    }
};