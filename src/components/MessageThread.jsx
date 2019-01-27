import React from "react"
import Message from "./Message" 

function MessageThread(props){

    let theMessages = props.messages.map( (message,i)=>{
        return <li key={`message-id-${i}`}> <Message message={message}/> </li>
    });
    
    return (
        <ul>
            {theMessages}
        </ul>
    );
}


export default MessageThread