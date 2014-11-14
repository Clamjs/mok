# Mok more smart than mock

As your wish, we build an mock tool for mock some http(s) response data.

## How to install

Mok don't support an server. But you can use this as a lib.

Now let's install this~

`(sudo) npm install mok (--save)`

## Use mo(c)k

The `mok.mo(c)k` api accept two params `filepath` (mock is an json data) and `isTrust` for mock

An example:

```
// /demo.json

// demo for test
/*
  this is a json file with some comments;
 */
{
  "comment": true,
  "json": true,
  "subData": {
    "yeap":"yeap",
    "arrayTest":[{
      "feel":"this is awesome",
      "nice": 1314
    }],
    "enum":[{
      "what":"enum support?"
    }, {
      "yeap":"enumable"
    }]
  }
}

// /tiny.json

{
  "json": true
}

// tiny-mock.json
{
  "name|1-5": "abc",
  "age:0-100": 12,
  "time": 123123123123123
}

// mock.js
// This is for smart mock with file
var data = require('mok').mok('/demo.json');
// This is for smart mock with json 
var data = require('mok').mock(require('/tiny.json'));
// This is for mock with tiny mock json (just use mockjs.mock)
var data = require('mok').mock(require('/tiny-mock.json'), true);
```
More about mock you can get from [here](http://mockjs.com)

## Use doc

```
var doc = require('mok').doc('/demo.json'/*, '/demo.md'*/);

// The out put is an string with markdown format~
```

## Connect
-----

You can connect me any time~

