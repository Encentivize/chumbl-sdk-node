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
});
