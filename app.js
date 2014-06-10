var bcrypt = require('bcrypt');
var https = require('https');
var fs = require('fs');
var auth = require('http-auth');

var basic = auth.basic({realm: ""},
  function (username, password, callback) {
    bcrypt.compare(password, fs.readFileSync('htpasswd',{encoding:'utf8'}), function(err, res) {
      callback(res);
    });
  }
);


var options = {
  key: fs.readFileSync("private-key.pem"),
  cert: fs.readFileSync("certificate.pem")
};

// Starting server.
https.createServer(basic, options, function (req, res) {
    res.end(fs.readFileSync("portable.html"));
}).listen(443);

// Log URL.
console.log("Server running at https://127.0.0.1:443/");
