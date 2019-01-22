
const express = require("express");
const server = express();

let webSocket = require("ws").Server;

const PORT = process.env.PORT || 3000;
const WEBSOCKETPORT = 43211;

server.use(express.static(__dirname+'/../public'));



server.listen(PORT,()=>{
    console.log(`the server is running on port ${PORT}`);


    console.log(`setup the websocket thing on port ${WEBSOCKETPORT}`);

    let webSocketServer = new webSocket({port:WEBSOCKETPORT})

    webSocketServer.on("connection",(ws)=>{
        ws.on("message",(message)=>{
            console.log(`got ${message}`)
            ws.send("Greesting");
        })
    })
});
