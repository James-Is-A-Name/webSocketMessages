import React from "react";

import TheHeader from "./Header";
import Body from "./Body";
import Speak from "./Speak";


class App extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            id: 0,
            ws: undefined,
            users: [],
            messages: []
        }
    }

    sendMessage(message){
        let messageObject = {
            id: this.state.id,
            text: message
        }
        this.state.ws.send(JSON.stringify(messageObject));
    }

    componentDidMount(){
        this.webSocketTest();

        setTimeout( ()=>{
            
            this.sendMessage("I have Joined");
        },2000)
    }

    webSocketTest(anObject){

        let ws = new WebSocket("ws://localhost:43211");
        ws.onopen = ()=> {
            console.log("websocket open")
            this.sendMessage('Finding ID');
        }

        //this function should possibly be put somewhere else, just make this a short function that passes on the websocket
        ws.onmessage = (theMessage) => {
            console.log(`got a message of ${theMessage.data}`);

            // this.messageReceive(theMessage.data);
            let messageObject = JSON.parse(theMessage.data);

            if(messageObject.text){
                if(messageObject.id == undefined){
                    messageObject.id = -1;
                }
                this.messageReceive(messageObject);
            }
            else if(messageObject.newId){
                this.setState({
                    ...this.state,
                    id: messageObject.newId
                })
            }
        }
        this.gotAWebsocket(ws);
    }

    gotAWebsocket(ws){
        //This should really check its valid first
        this.setState ( {
            ...this.state,
            ws: ws
        });

        console.log(`web socket obtained for the app test`);
    }

    messageReceive(theMessage){

        let newMessages = this.state.messages;
        newMessages.push(theMessage);
        this.setState(
            {
                ...this.state,
                messages: newMessages
            }
        )
    }

    render(){
        return (
            <React.Fragment>
                <TheHeader/>
                <Speak send={(message)=>this.sendMessage(message)}/>
                <Body userId={this.state.id} messages={this.state.messages}/>
            </React.Fragment>            
        );
    }
}

export default App 