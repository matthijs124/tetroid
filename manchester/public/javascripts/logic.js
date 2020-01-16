
// CLIENT SIDE

var socket = new WebSocket("ws://localhost:3000");


// begin: CLIENT RECEIVES MESSAGE
socket.onmessage = function(event) {

    console.log(event.data);

    // display player number
    if (JSON.parse(event.data).type == "player") {
        document.getElementById("player").innerHTML = "you are player: " + JSON.parse(event.data).value;
    }

    
    if (JSON.parse(event.data).type === "playersConnected") {
        // display gameStatus
        document.getElementById("gameReady").innerHTML = JSON.parse(event.data).value;
    }

}
// end: CLIENT RECEIVES MESSAGE



$(document).ready(function() {

    // when the play button is clicked 
    $("button").on("click", function(event) {

        //send that the user has clicked the Play / Jouer button
        var buttonClick = {
            type: "buttonClick"
        };

        socket.send(JSON.stringify(buttonClick));
        
    });
});