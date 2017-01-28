
var express = require('express');
var app = express();

var routes = require('../app/routes');

app.use(express.static('./public'));

routes(app);

module.exports = app;