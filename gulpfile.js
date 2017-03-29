'use strict';
var gulp = require('gulp');
var argv = require('yargs').argv;
var npm = require('npm');
var fs = require('fs');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

var jsPath = ['./lib/**/*.js'];
var testsPath = ['./tests/**/*.unit.js'];

gulp.task('default', ['tests']);

gulp.task('watch', ['tests'], function () {
    gulp.watch(jsPath, ['tests']);
});

gulp.task('tests', function (callback) {
    gulp.src(jsPath)
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(testsPath, {
                    read: false
                })
                .pipe(mocha({
                    reporter: 'nyan'
                }))
                .pipe(istanbul.writeReports())
                .pipe(istanbul.enforceThresholds({thresholds: {global: 0}})) // Enforce a coverage of at least 0% probably a good idea to change this value
                .on('end', callback);
        });
});

gulp.task('npmPublish', ['tests'], function (callback) {
    var username = argv.username;
    var password = argv.password;
    var email = argv.email;
    if (!username) {
        var usernameError = new Error("Username is required as an argument --username exampleUsername");
        return callback(usernameError);
    }
    if (!password) {
        var passwordError = new Error("Password is required as an argument --password  examplepassword");
        return callback(passwordError);
    }
    if (!email) {
        var emailError = new Error("Email is required as an argument --email example@email.com");
        return callback(emailError);
    }
    var uri = "http://registry.npmjs.org/";
    npm.load(null, function (loadError) {
        if (loadError) {
            return callback(loadError);
        }
        var auth = {
            username: username,
            password: password,
            email: email,
            alwaysAuth: true
        };
        var addUserParams = {
            auth: auth
        };
        npm.registry.adduser(uri, addUserParams, function (addUserError, data, raw, res) {
            if (addUserError) {
                return callback(addUserError);
            }
            var metadata = require('./package.json');
            metadata = JSON.parse(JSON.stringify(metadata));
            npm.commands.pack([], function (packError) {
                if (packError) {
                    return callback(packError);
                }
                var fileName = metadata.name + '-' + metadata.version + '.tgz';
                var bodyPath = require.resolve('./' + fileName);
                var body = fs.createReadStream(bodyPath);
                var publishParams = {
                    metadata: metadata,
                    access: 'public',
                    body: body,
                    auth: auth
                };
                npm.registry.publish(uri, publishParams, function (publishError, resp) {
                    if (publishError) {
                        return callback(publishError);
                    }
                    console.log("Publish succesfull: " + JSON.stringify(resp));
                    return callback();
                });
            });
        });
    });
});