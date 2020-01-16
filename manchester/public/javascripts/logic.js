
var socket = new WebSocket("ws://localhost:3000");
            socket.onmessage = function(event){

                document.getElementById("hello").innerHTML = event.data;

                if(JSON.parse(event.data).whatisthis === "num") {

                    if (JSON.parse(event.data).value === 2) {
                        console.log("ready to play");
                    }
                }



            }

            socket.onopen = function(){
                
                socket.send("Hello server --client");
                document.getElementById("hello").innerHTML = "Sending a first message to the server ...";
            };

