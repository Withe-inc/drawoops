// express is another layer on top of http
const app = require('express')();
// http is a built-in module that comes with Node.js
// createServer method allows http to act as a web server and receive requests
const http = require('http').createServer(app);
// initialize a new instance of socket.io by passing the http 
// (the HTTP server) object

const io = require('socket.io')(http, {
  cors: {
    //modify this later
    origin: '*',
  }
});


var path = require('path');

// Middleware functions are functions that have access to the request object 
// (req), the response object (res), and the next middleware function in
// the application’s request-response cycle. 
// The next middleware function is commonly denoted by a variable named next.

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

// server.listen() method creates a listener on the specified port or path
// a callback function is passed as second argument
http.listen(8080, () => {
  console.log('listening on *:8080');
});

