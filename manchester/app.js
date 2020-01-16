
// SERVER SIDE

var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

var server = http.createServer(app);

const wss = new websocket.Server({ server });

// numClients global variable 
var numClients = {
  whatisthis: "num",
  value: 0
};

// executed on connection
wss.on("connection", function(ws) {

    // server receives message
    ws.on("message", function incoming(message) {
      
      // when a player moves from splash to game
      if (JSON.parse(message).type === "buttonClick") {
        numClients.value++;
      }

      if (JSON.parse(message).type === "player") {
        alert(message);
        ws.send(message); // send BACK the stringified player object that was sent
      }

    });

    if (numClients.value > 1) {

      var twoPlayersConnected = {
        type: "playersConnected",
        value: "two players are connected"
      }

      ws.send(JSON.stringify(twoPlayersConnected));
    }

    else {
      var waitingForPlayer = {
        type: "playersConnected",
        value: "waiting for player"
      }
      
      ws.send(JSON.stringify(waitingForPlayer));
    }

});









server.listen(port);

app.get('/javascripts/logic.js', function (req, res) {
  res.sendFile("/javascripts/logic.js", {root: "./public"});
});

app.get('/game.html', function (req, res) {
  res.sendFile("game.html", {root: "./public"});
});

app.get('/', function (req, res) {
  res.sendFile("splash.html", {root: "./public"});
});