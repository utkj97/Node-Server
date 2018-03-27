var express = require('express');
//var http = require('http');
var serve_controller = require('./controllers/serve-controller');

var app = express();

/*var server = http.createServer(function(req, res){
  res.writeHead(200,{'Content-Type': 'text/plain'});
  res.end('hey');
});*/

serve_controller(app);

app.listen(3000);
console.log('Listening to port 3000');
