var express = require('express');
var app = express();

var addons = require('addons');
addons();

app.get('/', function(req, res){
  res.send('Hello World');
});

app.listen(3000);

