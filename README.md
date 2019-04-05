# Controller Handler

[![npm](http://img.shields.io/npm/v/controller-handler.svg)](https://www.npmjs.com/package/controller-handler) ![Downloads](https://img.shields.io/npm/dm/controller-handler.svg) [![Build Status](https://secure.travis-ci.org/leonardothibes/controller-handler.png)](http://travis-ci.org/leonardothibes/controller-handler) [![Package Quality](http://npm.packagequality.com/shield/controller-handler.svg)](http://packagequality.com/#?package=controller-handler) [![License](https://img.shields.io/npm/l/controller-handler.svg)](LICENSE)

Controller handler for message queues.

Installation
------------

```bash
npm install controller-handler --save
```

Examples
--------

The example below will require a file called __hello.js__ and will invoke the __world__ method into this file, passing the object __{name: 'john'}__ parameter for this method.

```js
'use strict';

const Controller = require('controller-handler'),
      controller = new Controller(__dirname + '/src/commands');

const message = {
    command: 'hello',
    action : 'world',
    params : {name: 'john'},
};

controller.handle(message, function(error, data)
{
    console.log(error); // In case of error
    console.log(data);  // In case of success
});
```

Test and development
--------------------

* Install external dependencies: **``npm install``**
* Run the test suite without coverage: **``npm test``**
* Run the test suite with coverage: **``npm run testdox``**

How to Contribute
-----------------

* Open a pull request or an issue about what you want to implement / change. We're glad for any help!
* Please be aware that we'll only accept fully tested code.

Contributors
------------

 * **Leonardo Thibes <leonardothibes@gmail.com>**

LICENSE
=======

Copyright (c) 2018 Leonardo Thibes

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
