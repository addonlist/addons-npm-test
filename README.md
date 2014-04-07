# Addons npm test

This test server shows how easy it is to install and use the Addons npm module for your Launchpack.io account.

## Install

* NOTE: first setup a node.js server. Below I give simple instructions for my setting up this express server.

Run this in your terminal:
``` shell
npm install addons
```

Add this to your javascript, server.js or otherwise:
``` javascript
var addons = require('addons');
addons();
```

Set environment variables and restart your server:
``` javascript
ADDONS_APP_ID='app_97308f3f-948a-4f90-879a-ea3155e5f6d7' ADDONS_APP_TOKEN='pyw5WBzdfFBh5ta5K63g' node server.js
```

## Heroku install

Additionally, do these things to push your app to Heroku. NOTE: You have to restart your node server as described above (creates addons.json) before running these steps.

Run this in your terminal once:
``` shell
heroku plugins:install git://github.com/ddollar/heroku-config.git
```

Run this in your terminal anytime your env vars change:
``` shell
rake addons:heroku:push
```

## Use your addons:

Coming soon.



<br />
<br />
<br />
Below this line is all test code<br />here for your convenience.
============================================================




## Express server setup

Run this in your terminal:
``` shell
npm install express
```

Add this to your javascript, server.js:
``` javascript
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send("Hello World");
});

app.listen(process.env.PORT || 3000);
```

Run this in your terminal:
``` shell
node server.js
```

For Heroku, add/modify these two files:
``` javascript
package.json
Procfile
```

Visit localhost:3000
