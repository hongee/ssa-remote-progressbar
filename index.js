var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//a very basic single user auth sequence
//totally secure
var config =
{
  'uname': 'uclassa',
  'pwd': 'ssa'
}

app.use(express.static('static'));

io.on('connection', function(socket) {
  console.log("A user connected!");
  socket.on('bar', function(val) {
    console.log("Switch to: " + val);
    io.emit('bar',val); 
  });

  socket.on('disconnect', function() {
    console.log("A user disconnected");
  });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

app.get('/client', function(req,res) {
  res.sendFile(__dirname + '/app/client.html');
});

http.listen(3000, function() {
  console.log("Server running on port 3000");
});
