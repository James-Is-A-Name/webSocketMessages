import React from "react";

import TheHeader from "./Header";
import Body from "./Body";
import Speak from "./Speak";


class App extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            ws: undefined,
            messages: []
        }

    }

    sendMessage(message){
        this.state.ws.send(message);
    }

    componentDidMount(){
        this.webSocketTest();
        console.log("component mount part")

        setTimeout( ()=>{
            this.state.ws.send("another Message")
        },5000)
    }

    webSocketTest(anObject){

        let ws = new WebSocket("ws://localhost:43211");
        ws.onopen = ()=> {
            console.log("websocket open")
            ws.send('hello')
        }

        ws.onmessage = (theMessage) => {
            console.log(`got a message of ${theMessage.data}`);
            this.messageReceive(theMessage.data);

            // this.messageReceive(JSON.parse(theMessage.data));
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
                <Body messages={this.state.messages}/>
            </React.Fragment>            
        );
    }
}

export default App 