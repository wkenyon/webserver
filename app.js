var https = require('https');
var http = require('http');
var express = require('express');
var logger = require('morgan');

var fs = require('fs');

var app = express();
app.use(logger())

var server_options = {
    ca : [fs.readFileSync('keys/ca.pem')], //[ca file]
    key: fs.readFileSync('keys/private-key.pem'), // [private key file]
    cert: fs.readFileSync('keys/certificate.pem') // [certificate file]
};

// Starting https server for virtual hosts
app.use(express.vhost('secret.wkenyon.net', require ('./secret.wkenyon.net/app.js').app));
app.use(express.vhost('wkenyon.net', require ('./wkenyon.net/app.js').app));

https.createServer(server_options,app).listen(44300);

// Starting http redirect server
http.createServer(function(req, res) {
    res.writeHead(302, {
        'Location': 'https://' + req.headers.host + req.url
    });
    res.end();
}).listen(8000);
