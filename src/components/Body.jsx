import React from "react"

function Body(props){

    let theMessages = props.messages.map( (message,i)=>{
        return <li key={`message-id-${i}`}>{message}</li>
    });
    
    return (
        <ul>
            {theMessages}
        </ul>
    );
}


export default Body