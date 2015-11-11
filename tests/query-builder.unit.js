/*globals describe, it, assert, chai, should, expect */ /*jshint expr: true*/ // jshint ignore:line
'use strict';
require('../test-init');
/* ----========[ end of test file setup ]========---- */
var buildUrl = require('../lib/query-builder');
describe('Tests for query builder - ', function () {
    it('1. Should fail if no url provided', function () {
        var errorOccurred = false;
        try {
            buildUrl();
        }
        catch (err) {
            errorOccurred = true;
        }
        assert.isTrue(errorOccurred);
    });
    it('2. if no options are provided the same url should be returned', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc/a?e=123&eqw=12";
        var result = buildUrl(testUrl);
        assert.equal(testUrl, result, 'built url was not the same as the input url when no options provided.');
    });
    it('3. the query object should get added on to the url', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
        var result = buildUrl(testUrl, {query: "bob=1"});
        assert.equal(result, testUrl + "?bob=1");
    });
    it('4. if the url ends in a / and there is a query object it should be removed', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
        var result = buildUrl(testUrl + "/", {query: "bob=1"});
        assert.equal(result, testUrl + "?bob=1");
    });
    it('5. if the url ends in a ? and there is a query object it should not end up with two question marks', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
        var result = buildUrl(testUrl + "?", {query: "bob=1"});
        assert.equal(result, testUrl + "?bob=1");
    });
    it('6. if the url already has a query, the extra query should just be appended to it, without a second ?', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc?jack=2";
        var result = buildUrl(testUrl, {query: "bob=1"});
        assert.equal(result, testUrl + "&bob=1");
    });
    it('7. if the url already has a query and the query ends in a &, the extra query should just be appended to it, without a second &', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc?jack=2&";
        var result = buildUrl(testUrl, {query: "bob=1"});
        assert.equal(result, testUrl + "bob=1");
    });
    it('8. if the url has no query, and i provide a raw query objcet, it should be appended to it', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
        var result = buildUrl(testUrl, {rawQuery: {bob: 1}});
        assert.equal(result, testUrl + '?rawQuery={"bob":1}');
    });
    it('9. if the url has no query, and i provide a raw query string, it should be appended to it', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
        var result = buildUrl(testUrl, {rawQuery: '{"bob":1}'});
        assert.equal(result, testUrl + '?rawQuery={"bob":1}');
    });
    it('10. if the url has no query, and i provide a query and a raw query object, they should both be appended to it', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
        var result = buildUrl(testUrl, {query: "jack=12", rawQuery: {bob: 1}});
        assert.equal(result, testUrl + '?jack=12&rawQuery={"bob":1}');
    });
    it('11. If the query value is an objcet it should be automatically stringified', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
        var result = buildUrl(testUrl, {query: {bob: 1}});
        assert.equal(result, testUrl + "?bob=1");
    });
    it('12. If options.aggregate is passed through it should be included in the url', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
        var result = buildUrl(testUrl, {aggregate: "ammount:sum"});
        assert.equal(result, testUrl + "?aggregate=ammount:sum");
    });
    it('13. If options.aggregate is not a string it should cause an error', function () {
        var errorOccurred = false;
        try {
            var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
            buildUrl(testUrl, {aggregate: 4});
        }
        catch (err) {
            errorOccurred = true;
        }
        assert.isTrue(errorOccurred);
    });
    it('14. If options.aggregate string did not contain a : it should cause an error', function () {
        var errorOccurred = false;
        try {
            var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
            buildUrl(testUrl, {aggregate: "ammount.sum"});
        }
        catch (err) {
            errorOccurred = true;
        }
        assert.isTrue(errorOccurred);
    });
    it('15. If options.metrics is passed through and it is a string it should be included in the url', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
        var result = buildUrl(testUrl, {metrics: "testerising"});
        assert.equal(result, testUrl + "?metrics=testerising");
    });
    it('16. If options.metrics is passed through and it is a string array it should be included in the url, joined by commas', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
        var result = buildUrl(testUrl, {metrics: ["testerising1", "testerising2"]});
        assert.equal(result, testUrl + "?metrics=testerising1,testerising2");
    });
    it('16. If options.metrics is passed through and it is a number there should be an error', function () {
        var errorOccurred = false;
        try {
            var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
            buildUrl(testUrl, {metrics: 2});
        }
        catch (err) {
            errorOccurred = true;
        }
        assert.isTrue(errorOccurred);
    });
    it('17. If options.metrics is passed through and it is an object there should be an error', function () {
        var errorOccurred = false;
        try {
            var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
            buildUrl(testUrl, {metrics: {'asd': true}});
        }
        catch (err) {
            errorOccurred = true;
        }
        assert.isTrue(errorOccurred);
    });
    it('18. If options.metrics is passed through and it is an object array there should be an error', function () {
        var errorOccurred = false;
        try {
            var testUrl = "http://qh3i12h34234jazsdzx.asds.zc";
            buildUrl(testUrl, {metrics: [{'asd': true}]});
        }
        catch (err) {
            errorOccurred = true;
        }
        assert.isTrue(errorOccurred);
    });
    it('19. If the url contains {targetDate} but the options does not have a value for it, it should be removed from the url', function () {
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc/{targetDate}";
        var result = buildUrl(testUrl);
        assert.equal(result, 'http://qh3i12h34234jazsdzx.asds.zc/');
    });
    it('20. If the url contains {targetDate} and the options.targetDate is a Date object, then the ISO formatted string should remain in the url', function () {
        var now = new Date();
        var nowString = now.toISOString();
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc/{targetDate}";
        var options = {targetDate: now};
        var result = buildUrl(testUrl, options);
        assert.equal(result, 'http://qh3i12h34234jazsdzx.asds.zc/{targetDate}');
        assert.equal(options.targetDate, nowString);
    });
    it('21. If the url contains {targetDate} and the options.targetDate has a string that is not a date, there should be an error', function () {
        var errorOccurred = false;
        try {
            var testUrl = "http://qh3i12h34234jazsdzx.asds.zc/{targetDate}";
            buildUrl(testUrl, {targetDate: "bob"});
        }
        catch (err) {
            errorOccurred = true;
        }
        assert.isTrue(errorOccurred);
    });
    it('22. If the url contains {targetDate} and the options.targetDate is a Date string, then the ISO formatted string should remain in the url', function () {
        var dateString = 'Wed Nov 11 2015 13:08:15 GMT+0200 (South Africa Standard Time)';
        var testUrl = "http://qh3i12h34234jazsdzx.asds.zc/{targetDate}";
        var options = {targetDate: dateString};
        var result = buildUrl(testUrl, options);
        assert.equal(result, 'http://qh3i12h34234jazsdzx.asds.zc/{targetDate}');
        assert.equal(options.targetDate, new Date(dateString).toISOString());
    });
});
