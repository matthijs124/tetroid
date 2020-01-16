var express = require("express");
var http = require("http");
var websocket = require("ws");

var port = process.argv[2];
var app = express();

var server = http.createServer(app);

const wss = new websocket.Server({ server });

var numClients = {
  whatisthis: "num",
  value: 0
};

wss.on("connection", function(ws) {
    numClients.value++;
    
    //let's slow down the server response time a bit to make the change visible on the client side
    setTimeout(function() {
        console.log("Connection state: "+ ws.readyState);
        if (numClients.value > 1) {
          ws.send("2 players are connected.");
        }
        console.log("Connection state: "+ ws.readyState);
    }, 2000);

    ws.send(JSON.stringify(numClients));


    // bunch of theoretical bullshit below this -- Mr. Krebbers
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