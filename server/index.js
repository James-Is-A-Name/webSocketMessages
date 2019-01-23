
const express = require("express");
const server = express();

const webSocketMessages = require("./webSocketMessages")

const PORT = process.env.PORT || 3000;
const WEBSOCKETPORT = 43211;

server.use(express.static(__dirname+'/../public'));


server.listen(PORT,()=>{
    console.log(`the server is running on port ${PORT}`);
});


webSocketMessages.start(WEBSOCKETPORT,() =>{
    console.log(`websocket stuff setup on port ${WEBSOCKETPORT}`)
});