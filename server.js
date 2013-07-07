var express = require("express");
var path = require('path');
var app = express();

app.use(express.compress())
   .use(express.static(path.join(__dirname, 'www')))
   .listen(process.env.PORT || 5000);
