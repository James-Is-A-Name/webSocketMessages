import React from "react"

import TheHeader from "./Header"
import Body from "./Body"

function webSocketTest(){

    let ws = new WebSocket("ws://localhost:43211");
    ws.onopen = ()=> {
        console.log("websocket open")
        ws.send('hello')
    }

    ws.onmessage = (theMessage) => {
        console.log(theMessage.data);
    }
}

function App(props){
    webSocketTest();
    return (
        <React.Fragment>
            <TheHeader/>
            <Body/>
        </React.Fragment>
    );
}


export default App 