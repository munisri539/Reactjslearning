import React from "react";

class ChildSingle extends React.Component{

    render(){
        return(
           <div>
             <h1>{this.props.passData}</h1>
             <h1>{this.props.passData1}</h1>
           </div>
        )
        
    }
}

export default ChildSingle;