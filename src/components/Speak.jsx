import React from "react"

class Speak extends React.Component{
    constructor(props){
        super(props);

        //i dont think the message call needs to be passed on. props will always have it and it sshouldnt be changed
        this.state = {
            message: ""
        }
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
            <div style={{display:"grid",gridTemplateColumns:"200px 1fr"}}>
                <h2>connected as Person {this.props.userId}</h2>
                <form style={{marginTop:"auto",marginBottom:"auto"}} onSubmit={(e)=>{e.preventDefault();this.send() }}>            
                    <input type="text" name="message" id="messageInput" onChange={this.handleChange.bind(this)} value={this.state.message}/>
                </form>
            </div>
        );
    }
}


export default Speak