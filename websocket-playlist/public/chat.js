//Make connection
var socket = io.connect('http://localhost:4000'); //Running on the frontend

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');


//Evenements

btn.addEventListener('click', function(){
  socket.emit('chat',{
    message: message.value, //Recupere le msg
    handle: handle.value  //Recupere handle
  }); //Envoie les data aux serveurs
    message.value = '';
});


message.addEventListener('keyup', function(e){
    socket.emit('typing',{
      message: message.value, //Recupere le msg
      handle: handle.value  //Recupere handle
    });
  if (e.keyCode == 13){
    socket.emit('chat',{
      message: message.value, //Recupere le msg
      handle: handle.value  //Recupere handle
    }); //Envoie les data aux serveurs
    message.value = '';
  }
});


//Listen for Evenements
socket.on('chat', function(data){
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + '</strong> ' + data.message + '</p>'; //On ajoute au HTML déjà présent
});


socket.on('typing', function(data){
  if(data.message == ''){
    feedback.innerHTML ='';
  }else{
    feedback.innerHTML = '<p><em>' + data.handle + ' is typing a message...</em></p>';
  }
});
