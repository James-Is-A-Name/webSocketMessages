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
            users: [],
            activeConnections: []
        }
    }

    sendMessage(message,whoTo = "All"){
        let messageObject = {
            id: this.state.id,
            text: message,
            toUserId : whoTo
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

        fetch("/getIp").then(response => {

            response.text().then((text)=>{

                let serverIp = JSON.parse(text).serverIp;
                console.log("dont remeber how this works so here is a try. server ip is = ",serverIp);

                
                this.webSocketSetup(serverIp);

                setTimeout( ()=>{
                    this.sendMessage("I have Joined");
                },2000)

            }).catch((err)=>{
                console.log("something went wrong the computer says")
            })
        })
        .catch((err)=>{
            console.log("i porbably wrote something wrong got err of ",err)
        })
    }

    webSocketSetup(ipAddress){
        
        // let ws = new WebSocket("ws://localhost:43211");

        //i feel there is a better way than this
        let ws = new WebSocket(`ws://${ipAddress}:43211`);
        // will want a way for this to automatically set itself based on where it is installed
            // dns stuff might sort it out
        // let ws = new WebSocket("ws://192.168.1.82:43211");
        ws.onopen = ()=> {
            console.log("websocket open")
            this.requestId();
        }

        //this function should possibly be put somewhere else, just make this a short function that passes on the websocket
        ws.onmessage = (theMessage) => {
            console.log(`got a message of ${theMessage.data}`);

            // this.messageReceive(theMessage.data);
            let messageObject = JSON.parse(theMessage.data);

            //this should be re-thought
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
            else if(messageObject.activeConnections){
                this.setState({
                    ...this.state,
                    activeConnections: messageObject.activeConnections
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
                <Speak userId={this.state.id} activeConnections={this.state.activeConnections} send={(message,whoTo)=>this.sendMessage(message,whoTo)}/>
                <Body userId={this.state.id} activeConnections={this.state.activeConnections}/>
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