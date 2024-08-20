import React, { Component } from 'react'
 class Parent extends Component {
    constructor(props){
        super(props);
        this.state = {data:"This is parent data"};
    }
  render() {
    return (
      <div>
        <Child passData ={this.state.data}></Child>
      </div>
    )
  }
}
 class Child extends Component{
    render(){
        return(
            <div>
                <h1>{this.props.passData}</h1>
            </div>
        )
    }
 } 
export default Parent