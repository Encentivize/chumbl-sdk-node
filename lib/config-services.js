'use strict';
var configCreator = require('./config-creator');
var chumblr = require('./chumblr.js');

module.exports = {
    configLoader: function (chumblrOptions) {
        return new configCreator(chumblrOptions);
    },
    functionBiteToString: function (bites) {
        for (var j = 0; j < bites.length; j++) {

            var bite = bites[j].bite;
            if (!bite) {
                continue;
            }
            var biteString = bite.toString().replace("function (backpack,res,next){", "").replace("/*xxxxx*/}", "");
            try {
                // this constructs the function to ensure that it is possible. It is not supposed to actually execute or return it.
                /*jslint evil: true */
                new Function("backpack", "res", "next", biteString);
            } catch (exception) {
                throw new Error("Error on functionBiteToString : " + exception.message + '. Bite string: ' + biteString);
            }
            bites[j].bite = biteString;
        }
        return bites;
    },
    copyProgramme: function (copyOptions, callback) {
        function configRetrieved(err, config, statusCode) {
            if (err) {
                return callback(err, null, statusCode);
            }
            function toChumblrRetrieved(err, toChumblr, statusCode) {
                /*jslint eqeq: true*/
                if (err && statusCode != 404) {
                    return callback(err, null, statusCode);
                }
                if (statusCode != 404) {
                    return callback("To Chumblr Exists", null, statusCode);
                }

                function chumblrCreated(err, createdChumblr, statusCode) {
                    if (err) {
                        return callback(err, null, statusCode);
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