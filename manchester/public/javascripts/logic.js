
// CLIENT SIDE

var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function(event) {


    // if (JSON.parse(event.data).whatisthis === "num") {
    //     if (JSON.parse(event.data).value === 2) {
    //         console.log("ready to play");
    //     }
    // }


    if (JSON.parse(event.data).type === "player") {
        document.getElementById("player").innerHTML = JSON.parse(event.data).value;
    }

    if (JSON.parse(event.data).type === "playersConnected") {
        document.getElementById("gameReady").innerHTML = JSON.parse(event.data).value;
    }

    
    //document.getElementById("gameReady").innerHTML = event.data;
    //document.getElementById("player").innerHTML = "does something" + event.data;

}


// socket.onopen = function() {
//     socket.send("Hello server --client");
//     document.getElementById("hello").innerHTML = "Sending a first message to the server ...";
// };

// global variable !? ... andy would be disappointed.
var playerId = 1;


$(document).ready(function() {

    // when the play/jouer button is clicked 
    $("button").on("click", function(event) {
        
        if (playerId === 1) {
            // create object with player = 1 (for sending)
            var player = {
                type: "player",
                value: 1
            }

            playerId++; // increment player so that it always will be 2
            
            // send that stringified player = 1 object
            socket.send(JSON.stringify(player));
        } 
        
        else {
            // create object with player = 2 (for sending) 
            var player = {
                type: "player",
                value: 2
            }
            // send that stringified player = 2 object
            socket.send(JSON.stringify(player));
        }


        //send that the user has clicked the Play / Jouer button
        var buttonClick = {
            type: "buttonClick"
        };

        socket.send(JSON.stringify(buttonClick));
        
    });
});

