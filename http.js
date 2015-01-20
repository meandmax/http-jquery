'use strict';

exports.getJson = function (url, data) {
    return $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: data
    });
};

exports.getScript = function (url) {
    return $.ajax({
        url: url,
        type: 'GET',
        dataType: 'script'
    });
};

var templatesByUrl = Object.create(null);

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

exports.post = function (url, data) {
    return $.ajax({
        url: url,
        type: 'POST',
        data: data
    });
};

exports.parseParameters = function () {
    var parameters = Object.create(null);
    var search     = window.location.search;

    var query;

    if (!search || !(query = search.substring(1).trim())) {
        return parameters;
    }

    query.split('&').map(function (parameter) {
        return parameter.split('=');
    }).forEach(function (parameter) {
        parameters[parameter[0]] = parameter[1];
    });

    return parameters;
};
