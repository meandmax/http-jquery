'use strict';

/**
 * Asynchronous GET request: takes a url and a data argument and returns a jQuery Deferred object
 * expects that the thirdparty returns a JSON
 *
 * @param  {string} url
 * @param  {any}    data [depends what the thirdparty expects]
 * @return {object} jQuery Deferred (promise)
 */
exports.getJson = function (url, data) {
    return $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: data
    });
};

/**
 * takes a url and returns a Jqer
 * expects that the thirdparty return a script
 *
 * @param  {any}        url [depends what the thirdparty expects]
 * @return {object}     jQuery Deferred (promise)
 */
exports.getScript = function (url) {
    return $.ajax({
        url: url,
        type: 'GET',
        dataType: 'script'
    });
};

var templatesByUrl = Object.create(null);

/**
 * takes a url and returns a script/template.
 * If a template is already loaded it will return the existing one.
 *
 * @param  {any}        url [depends what the thirdparty expects]
 * @return {object}     jQuery Deferred (promise)
 */
exports.getTemplate = function (url) {
    var promise  = new $.Deferred();
    var template = templatesByUrl[url];

    if (template && !template.pending) {
        promise.resolve();
    } else if (!template) {
        template = templatesByUrl[url] = {
            pending: true,
            promises: [
                promise
            ]
        };

        exports.getScript(url).then(function () {
            template.pending = false;

            template.promises.forEach(function (promise) {
                promise.resolve();
            });
        });
    } else {
        template.promises.push(promise);
    }

    return promise;
};

/**
 * Asynchronous POST request: takes a url and a data argument and returns a jQuery Deferred object
 * expects that the thirdparty returns a JSON
 *
 * @param  {string} url
 * @param  {any}    data [depends what the thirdparty expects]
 * @return {object} jQuery Deferred (promise)
 */
exports.post = function (url, data) {
    return $.ajax({
        url: url,
        type: 'POST',
        data: data
    });
};
