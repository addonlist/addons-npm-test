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

Send an email with a post request (or consult Mailgun docs for other ways).
Run this in a node shell or in your app's javascript:
```javascript
request = require('request');

var email = {
  to: "info@addonlist.com",
  from: "nodetestapp@addonlist.com",
  subject: "this is a sample from the npm test app",
  text: "this is a sample email body. we'll use mailgun to send this."
};

var sendSimpleEmail = function(email) {
  var url = "https://api:"+ process.env.MAILGUN_API_KEY + "@api.mailgun.net/v2/app7d41aa77b66a469180084fdaba10ecd8.mailgun.org/messages";

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
