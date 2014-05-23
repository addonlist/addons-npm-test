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
ADDONS_API_ID='YOUR_ADDONS_API_ID_HERE' ADDONS_AUTH_TOKEN='YOUR_ADDONS_AUTH_TOKEN_HERE' node server.js
```

## Heroku install

Run this in your terminal when your Launchpack.io settings change (anytime addons.json is updated):
``` shell
rake addons:heroku:push
```

<a href="http://addons-npm-test.herokuapp.com/" target="_blank">Sample app on heroku</a>

## Use your addons:

### Mailgun integration:

Make it easy on ourselves and install request:
```shell
npm install request
```

Send an email with a post request (or consult Mailgun docs SMTP info).
Run this in a node shell or in your app's javascript:
```javascript
request = require('request');

var email = {
  to: "info@addons.io",
  from: "info@addons.io",
  subject: "this is a sample from the npm test app",
  text: "this is a sample email body. we'll use mailgun to send this."
};

var sendSimpleEmail = function(email) {
  var url = "https://api:"+ process.env.MAILGUN_API_KEY +  "@api.mailgun.net/v2/" + process.env.MAILGUN_SMTP_LOGIN.match(/@(.*)$/)[1] + "/messages";

  request.post(
    url,
    { form: email },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      } else {
        console.log(error);
      }
    }
  );
};

sendSimpleEmail(email);
```

### MongoLab integration:

Install mongodb npm in Terminal:
```shell
npm install mongodb
```

Run this code in a node terminal, or add it to your app javascript (server.js or otherwise):
```javascript:
var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;

var saveEmailInMongo = function(email) {

  var mongoUri = process.env.MONGOLAB_URI;

  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('emails', function(er, collection) {
      collection.insert(email, {safe: true}, function(error, response) {
        if (!error && response.statusCode == 200) {
          // celebrate!
          console.log(response.body);
        } else {
          console.log(error);
        }
      });
    });
  });
};

saveEmailInMongo(email);
```



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
