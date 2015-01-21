/* globals afterEach, beforeEach, describe, it */

'use strict';

var http     = require('../http-jquery.js');
var assert   = require('expressive-assertion');
var Deferred = require('JQDeferred');
var sinon    = require('sinon');
var ts       = require('typesystem');

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

            assert(function () {
                return http.getJson(url, data) === returnValue;
            });

            assert(function () {
                return jQuery.ajax.calledOnce;
            });

            assert(function () {
                return jQuery.ajax.calledWithExactly({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    data: data
                });
            });
        });
    });

    describe('.getScript()', function () {
        it('calls `$.ajax()` with the correct options', function () {
            var returnValue = Math.random();
            var url         = Math.random();

            jQuery.ajax.returns(returnValue);

            assert(function () {
                return http.getScript(url) === returnValue;
            });

            assert(function () {
                return jQuery.ajax.calledOnce;
            });

            assert(function () {
                return jQuery.ajax.calledWithExactly({
                    url: url,
                    type: 'GET',
                    dataType: 'script'
                });
            });
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

            assert(function () {
                return ts.isFunctionObject(http.getTemplate(url).promise);
            });
        });

        it('resolves the returned deferreds', function () {
            var callback1 = sinon.spy();
            var callback2 = sinon.spy();
            var url       = Math.random();

            http.getTemplate(url).done(callback1);
            http.getTemplate(url).done(callback2);

            deferredScript.resolve();

            assert(function () {
                return callback1.calledOnce;
            });

            assert(function () {
                return callback2.calledOnce;
            });
        });

        it('resolves the returned deferred immediately', function () {
            var callback1 = sinon.spy();
            var callback2 = sinon.spy();
            var url       = Math.random();

            http.getTemplate(url).done(callback1);

            deferredScript.resolve();

            http.getTemplate(url).done(callback2);

            assert(function () {
                return callback1.calledOnce;
            });

            assert(function () {
                return callback2.calledOnce;
            });
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

            assert(function () {
                return http.post(url, data) === returnValue;
            });

            assert(function () {
                return jQuery.ajax.calledOnce;
            });

            assert(function () {
                return jQuery.ajax.calledWithExactly({
                    url: url,
                    type: 'POST',
                    data: data
                });
            });
        });
    });
});
