# http-jquery

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/meandmax/http-jquery/master/LICENSE)
[![npm](http://img.shields.io/npm/v/http-jquery.svg?style=flat)](https://www.npmjs.com/package/http-jquery)

[![build](http://img.shields.io/travis/meandmax/http-jquery/master.svg?style=flat)](https://travis-ci.org/meandmax/http-jquery)
[![coverage](http://img.shields.io/coveralls/meandmax/http-jquery/master.svg?style=flat)](https://coveralls.io/r/meandmax/http-jquery)
[![code climate](http://img.shields.io/codeclimate/github/meandmax/http-jquery.svg?style=flat)](https://codeclimate.com/github/meandmax/http-jquery)
[![dependencies](http://img.shields.io/david/meandmax/http-jquery.svg?style=flat)](https://david-dm.org/meandmax/http-jquery#info=dependencies&view=table)
[![devDependencies](http://img.shields.io/david/dev/meandmax/http-jquery.svg?style=flat)](https://david-dm.org/meandmax/http-jquery#info=devDependencies&view=table)


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

### Copyright

Copyright &copy; 2015 Maximilian Heinz, contributors. Released under the MIT License
