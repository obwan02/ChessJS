var express = require('express');
var fs = require("fs");
var app = express();

app.use(express.static('./src'))

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})