import React from "react"

class Speak extends React.Component{
    constructor(props){
        super(props);

        //i dont think the message call needs to be passed on. props will always have it and it sshouldnt be changed
        this.state = {
            message: ""
        }

    }

    saySomething(){
        console.log("stuff")
    }

    handleChange(event){
        if(event.target.value){
            this.setState({
                ...this.state,
                message: event.target.value
            })
        }
    }

    send(){
        console.log(`sending message of ${this.state.message}`)
        if(this.state.message && this.state.message != ""){
            this.props.send(this.state.message)
            
            this.setState({
                ...this.state,
                message: ""
            })
        }
    }

    render(){
        return (
            <form onSubmit={(e)=>{e.preventDefault();this.send() }} onChange={this.handleChange.bind(this)}>            
                <input type="text" name="message" id="messageInput" value={this.state.message}/>
            </form>
        );
    }
}


export default Speak