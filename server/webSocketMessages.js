
let webSocket = require("ws").Server;


//This is not safe, would need atomic interaction
let idRefNumber = 1;

let webSocketsConnected = []


function broadcastMessage(message,idOfSender){

    webSocketsConnected.forEach((connection)=>{

        if(!connection.ended){        
            if(connection.ws.readyState === 1){
                connection.ws.send(`got message from person ${idOfSender} : ${message}`);
            }
            else{
                connection.ended = true;
            }
        }
    })
}

function webSocketStart(portNum , completedCallback){

    let webSocketServer = new webSocket({port:portNum});
    
    webSocketServer.on("connection",(ws)=>{

        //This should be atomic or handed off to a locking function or something
            //except node might be single thread based. still dosent feel nice
        let id = idRefNumber;
        idRefNumber++;
        
        let theWebsocket = {
            id,
            ws,
            ended: false
        }

        webSocketsConnected.push(theWebsocket);

        ws.on("message",(message)=>{
            broadcastMessage(message,theWebsocket.id);
        })
    })

    completedCallback();
}




module.exports = {
    start: webSocketStart
}