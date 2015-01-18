var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  res.send(418);
});

exports.app = app;
