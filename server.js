var express = require('express');
var app = express();

var addons = require('addons');
addons();

app.get('/', function(req, res){
  var vars = "<br />MAILGUN_API_KEY: " + process.env.MAILGUN_API_KEY;
  vars += "<br />MONGOLAB_URI: " + process.env.MONGOLAB_URI;
  vars += "<br />LAUNCHBOX_APP_ID: " + process.env.MAILGUN_API_KEY;
  vars += "<br />ADDONS_APP_ID: " + process.env.MAILGUN_API_KEY;
  vars += "<br />ADDONS_APP_TOKEN: " + process.env.MAILGUN_API_KEY;

  res.send("ENVIRONMENT VARS:<br />" + vars);
});

app.listen(process.env.PORT || 3000);

