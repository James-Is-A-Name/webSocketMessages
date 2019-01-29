import React from "react"
import Message from "./Message" 

function MessageThread(props){

    let theMessages = props.messages.map( (message,i)=>{
        return <li key={`message-id-${i}`}> <Message message={message}/> </li>
    });
    
    let personTitle = <h2>Unknown user</h2>;
    if(props.messages.length > 0){
        if(props.messages[0])
        personTitle = <h2>Person {props.messages[0].id}</h2>
    }

    return (
        <div style={{border:"solid 1px blue", padding:"5px", margin:"2px"}}>
            {personTitle}
            <ul>
                {theMessages}
            </ul>
        </div>
    );
}


export default MessageThread