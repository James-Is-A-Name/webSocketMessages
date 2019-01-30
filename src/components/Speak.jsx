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

            
            let whoTo = document.getElementById("anIdForReference").value;
            console.log("who to is ",whoTo);
            
            this.props.send(this.state.message,whoTo)

            
            this.setState({
                ...this.state,
                message: ""
            })
        }
    }

    render(){
        let whoToOptions = this.props.activeConnections.map((target,i)=>{
            return <option key={`sendTargetOption${i}`} value={target}>{target}</option>
        });
        return (
            <div style={{display:"grid",gridTemplateColumns:"minmax(30vw,200px) 1fr minmax(30vw, 200px)"}}>
                <h2>connected as Person {this.props.userId}</h2>
                <form style={{marginTop:"auto",marginBottom:"auto"}} onSubmit={(e)=>{e.preventDefault();this.send() }}>            
                    <input type="text" name="message" id="messageInput" onChange={this.handleChange.bind(this)} value={this.state.message}/>
                </form>
                <select id={"anIdForReference"}>
                    <option value={"All"}>All</option>
                    {whoToOptions}
                </select>
            </div>
        );
    }
}


export default Speak