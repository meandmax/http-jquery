# lost-http-jquery

[![Version](http://img.shields.io/badge/version-0.0.1-green.svg)]()
[![Build Status](https://travis-ci.org/meandmax/lost-http-jquery.svg?branch=master)](https://travis-ci.org/meandmax/lost-http-jquery)
[![devDependency Status](https://david-dm.org/meandmax/lost-http-jquery/dev-status.svg)](https://david-dm.org/meandmax/lost-http-jquery#info=devDependencies)
[![Dependency Status](https://david-dm.org/meandmax/lost-http-jquery.svg)](https://david-dm.org/meandmax/lost-http-jquery.svg)

Nothing special ... but why writing these basic http-functions over and over again. Well tested jQuery ajax functions! There are still a lot of missing use-cases. If you have any, you are very welcome to add them!

### .getJson()

Asynchronous GET request: takes a url and a data argument and returns a jQuery Deferred object. Expects that the thirdparty returns a JSON.

### .getScript()

Takes a url and returns a Jqer
Expects that the thirdparty return a script

### .getTemplate()

Takes a url and returns a jQuery Deferred (promise)
If a template is already loaded it will return the existing promise.

### .post()

Asynchronous POST request: takes a url and a data argument and returns a jQuery Deferred object.
