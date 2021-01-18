'use strict';

var _class = require('./class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// express is another layer on top of http
var app = require('express')();
// http is a built-in module that comes with Node.js
// createServer method allows http to act as a web server and receive requests
var http = require('http').createServer(app);
// initialize a new instance of socket.io by passing the http 
// (the HTTP server) object


var io = require('socket.io')(http, {
  cors: {
    //modify this later
    origin: '*'
  }
});

//var game = require('./class')
var data = require('./data');

var path = require('path');

// Middleware functions are functions that have access to the request object 
// (req), the response object (res), and the next middleware function in
// the application’s request-response cycle. 
// The next middleware function is commonly denoted by a variable named next.

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

io.sockets.on('connection', function (socket) {
  var user = new _class2.default(io, socket, data);
  user.gameListeners();
});

// app.get('./:id', (req, res) => {
//   res.sendFile(path.resolve(__dirname + '/../public/index.html'));
// })

// server.listen() method creates a listener on the specified port or path
// a callback function is passed as second argument
http.listen(8080, function () {
  console.log('listening on *:8080');
});