import React from "react";

class BankAccount extends React.Component { 

    constructor() {
        super();
        this.state = {
            accountName : 'munisri',
            accountNumber : 1234567890,
            ifcCode : 'SBIN00021'
        };
        this.handelChange = this.handelChange.bind(this);
    }

    handelChange(){
        this.setState({ accountName : 'gracy' });
        this.setState({ accountNumber : 2314567890 });
        this.setState({ ifcCode : 'SBIN0000022' });
    }

    render(){
        return(
            <div>
                <h1>{this.state.accountName}</h1>
                <h1>{this.state.accountNumber}</h1>
                <h1>{this.state.ifcCode}</h1>
                <button onClick={this.handelChange}> Change button</button>
            </div>

        );
    }
}
export default BankAccount;