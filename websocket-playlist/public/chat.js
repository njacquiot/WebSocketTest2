//Make connection
var socket = io.connect('http://localhost:4000'); //Running on the frontend

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');


//Evenements

btn.addEventListener('click', function(){
  socket.emit('chat',{
    message: message.value, //Recpuere le msg
    handle: handle.value  //Recupere handle
  }); //Envoie les data aux serveurs
});

//Listen for Evenements
socket.on('chat', function(data){
  output.innerHTML += '<p><strong>' + data.handle + '</strong>' + data.message + '</p>'; //On ajoute au HTML déjà présent
});
