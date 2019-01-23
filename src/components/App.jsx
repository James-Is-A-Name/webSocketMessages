import React from "react"

import TheHeader from "./Header"
import Body from "./Body"







function webSocketTest(anObject){

    let ws = new WebSocket("ws://localhost:43211");
    ws.onopen = ()=> {
        console.log("websocket open")
        ws.send('hello')
    }

    ws.onmessage = (theMessage) => {
        console.log(`got a message of ${theMessage.data}`);
        anObject.messageReceive(theMessage.data);
    }

    return ws;
}


class App extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            ws: undefined,
            messages: []
        }

        this.messageReceive = this.messageReceive.bind();
        this.getAWebsocket = this.getAWebsocket.bind();
    }

    componentDidMount(){

    }

    getAWebsocket(ws){
        this.setState ( {
            ...this.state,
            ws: ws
        });

        console.log(`web socket obtained for the app test`)
    }

    messageReceive(theMessage){

        let newMessages = this.state.messages;
        newMessages.push(theMessage);
        this.setState(
            {
                ...this.state,
                messages: newMessages
            }
        )
    }

    render(){
        return (
            <React.Fragment>
                <TheHeader/>
                <Body messages={this.state.messages}/>
            </React.Fragment>            
        );
    }
}

// function App(props){
//     webSocketTest();
//     return (
//         <React.Fragment>
//             <TheHeader/>
//             <Body/>
//         </React.Fragment>
//     );
// }


export default App 