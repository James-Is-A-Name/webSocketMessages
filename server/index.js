
const express = require("express");
const server = express();

const webSocketMessages = require("./webSocketMessages")

const PORT = process.env.PORT || 3000;
const WEBSOCKETPORT = 43211;

server.use(express.static(__dirname+'/../public'));


const localInfo = require('os')


//to allow the page to grab the ip for the websocket connection while testing locally
server.get('/getIp',(req,res)=>{
    //the hardcoded 1 in here is to grab the second entry which is ipv4 not the ipv6
        //This is something that should be corrected to be less flimsy
    let serverIp = localInfo.networkInterfaces()["Wi-Fi"][1].address;
    
    res.send({serverIp});
})

server.listen(PORT,()=>{
    console.log(`the server is running on port ${PORT}`);
});


webSocketMessages.start(WEBSOCKETPORT,() =>{
    console.log(`websocket stuff setup on port ${WEBSOCKETPORT}`)
});