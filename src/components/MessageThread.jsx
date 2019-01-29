import React from "react"
import Message from "./Message" 

function MessageThread(props){

    let theMessages = props.messages.map( (message,i)=>{
        return <li key={`message-id-${i}`}> <Message message={message}/> </li>
    });
    
    return (
        <div style={{border:"solid 1px blue", padding:"5px", margin:"2px"}}>
            <ul>
                {theMessages}
            </ul>
        </div>
    );
}


export default MessageThread