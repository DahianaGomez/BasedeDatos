
var config = {
  apiKey: "AIzaSyALdEXvP3VJIoWgfkbCY6J3cCFUrbjEwAw",
  authDomain: "realtime-2018.firebaseapp.com",
  databaseURL: "https://realtime-2018.firebaseio.com",
  projectId: "realtime-2018",
  storageBucket: "realtime-2018.appspot.com",
  messagingSenderId: "1081179332250"
};
firebase.initializeApp(config);

const userName = prompt ('Ingrese su nombre de usuario');
const database = firebase.database();

$('button').click( function( event ) {
  event.preventDefault();
  var mensaje = $('#mensaje').val();

  var data = { usuario: userName, mensaje: mensaje };
  database.ref('chat/').push(data, function(err) {
    if (err) { throw err;}
    else { 
      console.info('Guardamos la informacion');
      ponerMensaje(data);
      $('#mensaje').val('');
    }
  });

});

function ponerMensaje (puca){
  $('#caja').append('<p>' + puca.usuario + ': ' + puca.mensaje +  '<p>');
}
function iterar(data){
  for ( var ciclo in data){
    if (data.hasOwnProperty(ciclo)){
      var element = data[ciclo];
      var paraCambiar ={
        usuario: element.usuario,
        mensaje: element.mensaje,
      };
      ponerMensaje(element);
    }
  }
}

var traerMensajes = new Promise(function(res, rej){
  var mensajes = database.ref('/chat/').once('value').then(function(snapshot){
    return res( snapshot.val() );

  });
  if (!mensajes){return rej();}
});

traerMensajes.then(function(data){
  iterar(data);
});
