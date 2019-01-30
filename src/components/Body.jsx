import React from "react"
import MessageThread from "./MessageThread"

import { connect } from "react-redux";

function Body(props){

    let seperatedMessages = props.messages.reduce((output,message)=>{
        if(props.userId == message.id){
            return output;
        }
        if(output[message.id]){
            output[message.id].push(message);
        }
        else{
            output[message.id] = [message];
        }

        return output;
    },{})

    let theMessages = Object.keys(seperatedMessages).map((key)=>{

        let isActive = props.activeConnections.reduce((output,activeConnection) =>{
            return activeConnection == key ? true : output 
        },false);
        return <MessageThread key={`message-id-${key}`} isActive={isActive} messages={seperatedMessages[key]}/>
    });
    
    return (
        <div style={{display:"grid", gridTemplateColumns:"minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr)"}}>
            {theMessages}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages.messages
    }
}

export default connect(mapStateToProps)(Body)