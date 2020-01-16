var socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function(event) {

    document.getElementById("gameReady").innerHTML = event.data;

    // if (JSON.parse(event.data).whatisthis === "num") {
    //     if (JSON.parse(event.data).value === 2) {
    //         console.log("ready to play");
    //     }
    // }

    alert(event);
    document.getElementById("player").innerHTML = "does something";

}


// socket.onopen = function() {
//     socket.send("Hello server --client");
//     document.getElementById("hello").innerHTML = "Sending a first message to the server ...";
// };

// global variable !? ... andy would be dissapointed.
var playerId = 1;

// when the game button is clicked 
$(document).ready(function() {

    $("button").on("click", function(event) {
        console.log("boomer");
        
        if (playerId === 1) {
            var player = {
                type: "player",
                value: 1
            }
            playerId++;
            socket.send(JSON.stringify(player));
        } else {
            var player = {
                type: "player",
                value: 2
            }
            socket.send(JSON.stringify(player));
        }

        // alert(stringify(player));

        var buttonClick = {
            type: "buttonClick"
        };


        socket.send(JSON.stringify(buttonClick));
        
    });
});

