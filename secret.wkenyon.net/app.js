var fs = require('fs');
var bcrypt = require('bcrypt');
var express = require('express');
var auth = require('http-auth');

var basic = auth.basic({realm: "passhashpluss"},
    function (username, password, callback) {
      bcrypt.compare(password, fs.readFileSync(__dirname + '/htpasswd',{encoding:'utf8'}),
        function(err, res) {console.log(res);callback(res);});
});

var app = express();

app.use(auth.connect(basic));

// Starting https server.
app.get('/', function (req, res) {
    res.send(fs.readFileSync(__dirname + '/portable.html')
      +'<a href="https://logout@secret.wkenyon.net">logout</a>');
})

exports.app = app;
