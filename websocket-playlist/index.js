var express = require('express');

var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(4000, function(){
  console.log('Listenning to request on port 4000');
});


//Static files
app.use(express.static('public'));


//Socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection', socket.id) // Unique id par socket

  socket.on('chat', function(data){
    io.sockets.emit('chat', data); //on envoie les données à toutes les sockets connectées
  });

  socket.on ('typing', function(data){
    socket.broadcast.emit('typing', data) //On émet a tout le monde sauf nous
  })

});
