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

// mock.js

var data = require('mok').mok('/demo.json');
```

## Use doc

```
var doc = require('mok').doc('/demo.json'/*, '/demo.md'*/);
```

