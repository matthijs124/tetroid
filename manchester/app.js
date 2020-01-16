var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

var server = http.createServer(app);

const wss = new websocket.Server({ server });

// Actual good shit below this line
var numClients = {
  whatisthis: "num",
  value: 0
};

wss.on("connection", function(ws) {

    ws.on("message", function incoming(message) {
      console.log(message);
      if (JSON.parse(message).type === "buttonClick") {
        numClients.value++;
      }

      if (JSON.parse(message).type === "player") {
        ws.send(message);
      }
    });

    if (numClients.value > 1) {
      ws.send("2 players are connected.");
    }

    else {
      ws.send("waiting for player");
    }

    // bunch of _theoretical_ bullshit below this -- Mr. Krebbers
    ws.on("message", function incoming(message) {
        console.log("[LOG] " + message);
    });
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