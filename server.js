var express = require('express');
var app = express();

var addons = require('addons');
addons();

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
    <label for=\"email_body\">Body</label><br> \
    <input id=\"email_body\" name=\"email[body]\" type=\"text\"> \
  </div> \
  <div class=\"actions\"> \
    <input name=\"commit\" type=\"submit\" value=\"Create Email\"> \
  </div> \
</form> \
</body>"

  var vars = emailForm;
  vars += "<footer>";
  vars += "ENVIRONMENT VARS:<br />";
  vars += "<br />MAILGUN_API_KEY: " + process.env.MAILGUN_API_KEY;
  vars += "<br />MONGOLAB_URI: " + process.env.MONGOLAB_URI;
  vars += "<br />LAUNCHBOX_APP_ID: " + process.env.MAILGUN_API_KEY;
  vars += "<br />ADDONS_APP_ID: " + process.env.MAILGUN_API_KEY;
  vars += "<br />ADDONS_APP_TOKEN: " + process.env.MAILGUN_API_KEY;
  vars += "</footer>";

  res.send(vars);
});

app.listen(process.env.PORT || 3000);

