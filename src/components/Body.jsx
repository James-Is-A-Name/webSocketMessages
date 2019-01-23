import React from "react"

function Body(props){

    let theMessages = props.messages.map( (message)=>{
        return <li>{message}</li>
    });
    
    return (
        <ul>
            {theMessages}
        </ul>
    );
}


export default Body