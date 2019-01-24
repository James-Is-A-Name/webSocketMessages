
let webSocket = require("ws").Server;


//This is not safe, would need atomic interaction
let idRefNumber = 1;

let webSocketsConnected = []


function broadcastMessage(messageText,idOfSender){
    console.log(`broadcasting message from id=${idOfSender}. it reads ${messageText}`)

    webSocketsConnected.forEach((connection)=>{
        if(!connection.ended){        
            if(connection.ws.readyState === 1){
                // connection.ws.send(`got message from person ${idOfSender} : ${message}`);
                connection.ws.send(JSON.stringify({id:idOfSender, text:messageText}));
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

            console.log(`parsing the message of ${message}`)
            let theMessage = JSON.parse(message);

            if(theMessage.text){
                //This double checking might be a bit pointless
                if(theMessage.id == theWebsocket.id){
                    console.log(`got a message from ${theWebsocket.id}`);
                    broadcastMessage(theMessage.text,theWebsocket.id);
                }
            }
        })
    })

    completedCallback();
}




module.exports = {
    start: webSocketStart
}