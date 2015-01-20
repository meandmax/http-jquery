/* globals afterEach, beforeEach, describe, it */

'use strict';

var assert   = require('assert');
var Deferred = require('JQDeferred');
var http     = require('../../lib/utils/http.js');
var sinon    = require('sinon');

describe('http', function () {
    var jQuery;

    var setWindowLocationSearch = function (search) {
        global.window = {
            location: {
                search: search
            }
        };
    };

    beforeEach(function () {
        jQuery = global.$ = {
            ajax: sinon.stub(),
            Deferred: Deferred
        };
    });

    describe('.getJson()', function () {
        it('calls `$.ajax()` with the correct options', function () {
            var data        = Math.random();
            var returnValue = Math.random();
            var url         = Math.random();

            jQuery.ajax.returns(returnValue);

            assert.strictEqual(http.getJson(url, data), returnValue);

            assert(jQuery.ajax.calledOnce);

            assert(jQuery.ajax.calledWithExactly({
                url: url,
                type: 'GET',
                dataType: 'json',
                data: data
            }));
        });
    });

    describe('.getScript()', function () {
        it('calls `$.ajax()` with the correct options', function () {
            var returnValue = Math.random();
            var url         = Math.random();

            jQuery.ajax.returns(returnValue);

            assert.strictEqual(http.getScript(url), returnValue);

            assert(jQuery.ajax.calledOnce);

            assert(jQuery.ajax.calledWithExactly({
                url: url,
                type: 'GET',
                dataType: 'script'
            }));
        });
    });

    describe('.getTemplate()', function () {
        var deferredScript;

        beforeEach(function () {
            sinon.stub(http, 'getScript');

            http.getScript.returns(deferredScript = new Deferred());
        });

        it('returns a deferred', function () {
            var url = Math.random();

            assert.strictEqual(typeof http.getTemplate(url).promise, 'function');
        });

        it('resolves the returned deferreds', function () {
            var callback1 = sinon.spy();
            var callback2 = sinon.spy();
            var url       = Math.random();

            http.getTemplate(url).done(callback1);
            http.getTemplate(url).done(callback2);

            deferredScript.resolve();

            assert(callback1.calledOnce);
            assert(callback2.calledOnce);
        });

        it('resolves the returned deferred immediately', function () {
            var callback1 = sinon.spy();
            var callback2 = sinon.spy();
            var url       = Math.random();

            http.getTemplate(url).done(callback1);

            deferredScript.resolve();

            http.getTemplate(url).done(callback2);

            assert(callback1.calledOnce);
            assert(callback2.calledOnce);
        });

        afterEach(function () {
            http.getScript.restore();
        });
    });

    describe('.post()', function () {
        it('calls `$.ajax()` with the correct options', function () {
            var data        = Math.random();
            var returnValue = Math.random();
            var url         = Math.random();

            jQuery.ajax.returns(returnValue);

            assert.strictEqual(http.post(url, data), returnValue);

            assert(jQuery.ajax.calledOnce);

            assert(jQuery.ajax.calledWithExactly({
                url: url,
                type: 'POST',
                data: data
            }));
        });
    });

    describe('.parseParameters()', function () {
        it('returns an empty object', function () {
            setWindowLocationSearch('');
            assert.deepEqual(http.parseParameters(), {});

            setWindowLocationSearch('?');
            assert.deepEqual(http.parseParameters(), {});

            setWindowLocationSearch('? ');
            assert.deepEqual(http.parseParameters(), {});
        });

        it('returns a parameters object', function () {
            setWindowLocationSearch('?foo=&bar=baz');

            assert.deepEqual(http.parseParameters(), {
                foo: '',
                bar: 'baz'
            });
        });
    });
});
