const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(4000).sockets;
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var actualName = '';



// Connect to mongo
mongo.connect('mongodb://127.0.0.1/mongochat', function(err, db){
    if(err){
        console.log(err);
    }

    console.log('MongoDB connected');

    // Connect to Socket.io
    client.on('connection', function(socket){
        let chat = db.collection('chats');

        // Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }

            // Emit the messages
            socket.emit('output', res);
        });

        // Handle input events
        socket.on('input', function(data){
            let message = data.message;

            
                // Insert message
                chat.insert({name: actualName, message: message}, function(){
                    client.emit('output', [data]);

                });
            
        });

        // Listen for clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            chat.remove({}, function(){
               
            });
        });
    });
});

app.set('port', 3000);


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false }));

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log("magic happens on port 3000 " + port);
});





app.all('/', function(req,res) 
{
    res.sendFile(__dirname + '/public/index_home.html');
});

app.all('/chat/:nameOfUser?', function(req,res) 
{
    res.sendFile(__dirname + '/public/index1.html');
    actualName = req.query.nameOfUser;
    console.log("actualName is " + actualName);
    
    
    
});

app.all('/css/bootstrap.min.css', function(req,res) 
{
    res.sendFile(__dirname + '/public/css/bootstrap.min.css');
});

app.all('/images/background1.jpg', function(req,res) 
{
    res.sendFile(__dirname + '/public/images/background1.jpg');
});

app.all('/images/favicon.ico', function(req,res) 
{
    res.sendFile(__dirname + '/public/images/favicon.ico');
});

app.all('/images/neptune.png', function(req,res) 
{
    res.sendFile(__dirname + '/public/images/neptune.png');
});

app.all('/scripts/chat.js', function(req,res) 
{
    res.sendFile(__dirname + '/public/scripts/chat.js');
});

