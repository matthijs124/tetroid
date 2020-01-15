
var socket = new WebSocket("ws://localhost:3000");
            socket.onmessage = function(event){
                document.getElementById("hello").innerHTML = event.data;
            }

            socket.onopen = function(){
                socket.send("Hello from your other half");
                document.getElementById("hello").innerHTML = "Sending a first message to the server ...";
            };

