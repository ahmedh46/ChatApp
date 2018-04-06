(function() {
    var loggedInUserSection = document.getElementById('loggedInUserSection');
    var inputMessages = document.getElementById('inputMessages');
    var outputMessages = document.getElementById('outputMessages');
    var clearButton = document.getElementById('clear');
    var sendButton = document.getElementById('send');
    var url = window.location.href; 
    var splitUrlName = url.split("http://localhost:3000/chat?nameOfUser=")
    

   
   

    

     // Connect to socket.io
     var socket = io.connect('http://127.0.0.1:4000');
     // Check for connection
     if(socket !== undefined){
         console.log('Connected to socket...');
         // Handle Output
         socket.on('output', function(data){
            if(data.length >=1) {
                for(var i=0;i<data.length;i++)
                outputMessages.innerHTML += data[i].name + ": " + data[i].message + "<br>"; 
            }
         })

       if(splitUrlName[1] == " " || splitUrlName[1] == undefined || splitUrlName[1] == null) {
        window.location.replace("http://localhost:3000/");
       }
      
      loggedInUserSection.innerHTML = "<b>Welcome " + splitUrlName[1] + "</b>";

        document.onkeydown = function (e) {
        if(e.which === 13 && e.shiftKey == false){
            if(inputMessages.value.trim()) {
                socket.emit('input', {
                    name: splitUrlName[1],
                    message:inputMessages.value
                });
            inputMessages.value = "";
            event.preventDefault();
        }
    }};

        sendButton.addEventListener('click',function(event) {
            if(inputMessages.value.trim()) {
            socket.emit('input', {
                name: splitUrlName[1],
                message:inputMessages.value
            });
            inputMessages.value = "";
            event.preventDefault();
        }
        });

        if(splitUrlName[1] == "admin9999") {
            clearButton.style.display = "block";
            clearButton.style.width = "50%";
            clearButton.style.margin= "auto";
        }
        clearButton.addEventListener('click', function(event){
            socket.emit('clear');
            outputMessages.innerHTML = "";
        })
        };
})();