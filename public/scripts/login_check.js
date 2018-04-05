(function() {
    var submitButton = document.getElementById('submitButton');
    var nameOfUser = document.getElementById('nameOfUser');

    var socket = io.connect('http://127.0.0.1:4000');
     // Check for connection
     if(socket !== undefined){
         console.log('Connected to socket... from login');

         submitButton.addEventListener('click', function(event) {
            socket.emit('input', {
            name: nameOfUser.value
        })
    });
     }
}) ();