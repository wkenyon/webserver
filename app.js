//usage: node app.js [html file] [private key file] [certificate file]

var bcrypt = require('bcrypt');
var https = require('https');
var fs = require('fs');
var auth = require('http-auth');

var basic = auth.basic({realm: ""},
  function (username, password, callback) {
    bcrypt.compare(password, fs.readFileSync('htpasswd',{encoding:'utf8'}),
      function(err, res) {
        callback(res);
    });
  }
);

var options = {
  key: fs.readFileSync(process.argv[3]), //argv[3] = [private key file]
  cert: fs.readFileSync(process.argv[4]) //argv[4] = [certificate file]
};



// Starting server.
https.createServer(basic, options, function (req, res) {
  //log request
  var now = new Date();
  var jsonDate = now.toJSON();
  var ip = req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  console.log(jsonDate + ": request from: " + ip);
  console.log("                          user: " + req.user);

  //actually serve file
  res.writeHead(200)
  res.end(fs.readFileSync(process.argv[2])); //argv[2] = [html file]
}).listen(443);

// log server starting
var now = new Date();
var jsonDate = now.toJSON();
console.log(jsonDate + ": Server running at https://127.0.0.1:443/");
