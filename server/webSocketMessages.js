
let webSocket = require("ws").Server;


//This is not safe, would need atomic interaction
let idRefNumber = 1;

//this should just be an object/class thing
let webSocketsConnected = []

let activeConnections = [];


function broadcastActiveConnections(){
    
    webSocketsConnected.forEach((connection)=>{
        if(!connection.ended){        
            if(connection.ws.readyState === 1){
                // connection.ws.send(`got message from person ${idOfSender} : ${message}`);
                connection.ws.send(JSON.stringify({activeConnections}));
            }
            else{
                connection.ended = true;
            }
        }
    })
}
function broadcastMessage(messageText,idOfSender){
    //console.log(`broadcasting message from id=${idOfSender}. it reads ${messageText}`)

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

function checkTheWebsockets(){

    let newActiveConnections = []
    webSocketsConnected.forEach((connection,index)=>{
        if(connection.ws.readyState === 1){
            console.log(`person ${index} is connected`);
            newActiveConnections.push(webSocketsConnected[index].id)
        }
    })

    activeConnections = newActiveConnections;
    broadcastActiveConnections();
}

function handleMessge(connection,message){
    broadcastMessage(message.text,connection.id);
}
function getAnID(user){
    let connection = webSocketsConnected.find( (socket) => socket.id == user.id )
    connection.ws.send(JSON.stringify({newId:connection.id}));
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
            let theMessage = JSON.parse(message);
            if(theMessage.giveMeAnID){
                getAnID(theWebsocket)
            }
            else{
                handleMessge(theWebsocket,theMessage)
            }
        })

        ws.on("close",()=>{
            checkTheWebsockets();
        });
        checkTheWebsockets(); //Just put it here for testing. move later to better place
    })

    completedCallback();
}




module.exports = {
    start: webSocketStart
}