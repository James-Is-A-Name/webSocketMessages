import React from "react"
import MessageThread from "./MessageThread" 

function Body(props){

    let seperatedMessages = props.messages.reduce((output,message)=>{
        if(props.userId == message.id)
        {
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

    let theMessages = Object.keys(seperatedMessages).map((key,index)=>{
        return <MessageThread key={`message-id-${index}`} messages={seperatedMessages[key]}/>
    });
    
    return (
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr"}}>
            {theMessages}
        </div>
    );
}


export default Body