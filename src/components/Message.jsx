import React from "react"

function Message(props){

    let theMessage = props.message
    
    return (
        <div style={{display: "grid", gridTemplateColumns: "minmax(50px,25%) minmax(50px,75%)",width:"minmax(30vw,400px)", border:"1px solid"}}>

            {/* the z index is because the div appears to be shifted slightly and blocking a pixel at the bottom */}
            <div style={{backgroundColor:"lightBlue", zIndex:"-1",paddingLeft:"5px",height:"100%",width:"100%"}}>
                <span> Person {theMessage.id}</span>
            </div>
            <div>
                <span style={{paddingLeft:"10px"}}>{theMessage.text}</span>
            </div>
        </div>
    );
}


export default Message