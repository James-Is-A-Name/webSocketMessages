import React from "react";

import {connect} from "react-redux"

import TheHeader from "./Header";
import Body from "./Body";
import Speak from "./Speak";

import {addMessageAction} from "../actions/messages"


class App extends React.Component{

    constructor(props){
        super(props);

        this.state ={
            id: 0,
            ws: undefined,
            users: []
        }
    }

    sendMessage(message){
        let messageObject = {
            id: this.state.id,
            text: message
        }
        this.state.ws.send(JSON.stringify(messageObject));
    }

    requestId(){
        let messageObject = {
            id: this.state.id,
            text: "can i get an ID Please",
            giveMeAnID: true
        }
        this.state.ws.send(JSON.stringify(messageObject));
    }

    componentDidMount(){
        this.webSocketTest();

        setTimeout( ()=>{
            this.sendMessage("I have Joined");
        },2000)
    }

    webSocketTest(){

        let ws = new WebSocket("ws://localhost:43211");
        ws.onopen = ()=> {
            console.log("websocket open")
            this.requestId();
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

        this.props.addMessage(theMessage);
    }

    render(){
        return (
            <React.Fragment>
                <TheHeader/>
                <Speak send={(message)=>this.sendMessage(message)}/>
                <Body userId={this.state.id}/>
            </React.Fragment>            
        );
    }
}


const mapDispatchToProps = (dispatch)=>{
    return{
        addMessage: (message) => {
            dispatch(addMessageAction(message))
        }
    }
}

export default connect(null,mapDispatchToProps)(App)