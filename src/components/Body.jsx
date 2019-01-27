import React from "react"
import Message from "./Message" 

function Body(props){

    let theMessages = props.messages.map( (message,i)=>{
        // return <li key={`message-id-${i}`}>{message}</li>
        // return <li key={`message-id-${i}`}>{message.text}</li>
        return <li key={`message-id-${i}`}> <Message message={message}/> </li>
    });
    
    return (
        <ul>
            {theMessages}
        </ul>
    );
}


export default Body