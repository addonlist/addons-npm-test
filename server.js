var express = require('express');
var request = require('request');
var addons = require('addons');
addons();

var app = express();
app.use(express.bodyParser());

var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;

app.get('/', function(req, res){
  var emailForm = "<body> \
<h1>New email</h1> \
<form accept-charset=\"UTF-8\" action=\"/emails\" class=\"new_email\" id=\"new_email\" method=\"post\"><div style=\"margin:0;padding:0;display:inline\"><input name=\"utf8\" type=\"hidden\" value=\"✓\"></div> \
  <div class=\"field\"> \
    <label for=\"email_to\">To</label><br> \
    <input id=\"email_to\" name=\"email[to]\" type=\"text\"> \
  </div> \
  <div class=\"field\"> \
    <label for=\"email_from\">From</label><br> \
    <input id=\"email_from\" name=\"email[from]\" type=\"text\"> \
  </div> \
  <div class=\"field\"> \
    <label for=\"email_subject\">Subject</label><br> \
    <input id=\"email_subject\" name=\"email[subject]\" type=\"text\"> \
  </div> \
  <div class=\"field\"> \
    <label for=\"email_text\">Body</label><br> \
    <input id=\"email_text\" name=\"email[text]\" type=\"text\"> \
  </div> \
  <div class=\"actions\"> \
    <input type=\"submit\" value=\"Create Email\"> \
  </div> \
</form> \
</body>"

  var vars = emailForm;
  vars += "<footer>";
  vars += "ENVIRONMENT VARS:<br />";
  vars += "<br />MAILGUN_API_KEY: " + process.env.MAILGUN_API_KEY;
  vars += "<br />MONGOLAB_URI: " + process.env.MONGOLAB_URI;
  vars += "<br />ADDONS_API_ID: " + process.env.ADDONS_API_ID;
  vars += "<br />ADDONS_AUTH_TOKEN: " + process.env.ADDONS_AUTH_TOKEN;
  vars += "</footer>";

  res.send(vars);
});

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

app.post('/emails', function(req, res){

  saveEmailInMongo(req.body.email);

  sendSimpleEmail(req.body.email);

  res.send("Email sent to Mailgun via Launchpack.io! Ensure your email addresses were valid for delivery.");
});

app.listen(process.env.PORT || 3000);

