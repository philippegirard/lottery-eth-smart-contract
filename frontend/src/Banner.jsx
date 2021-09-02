import React from "react";
import web3 from "./web3";

export default class Banner extends React.Component {
    state = {
        selectedWeb3Account: '',
    }

    async componentDidMount() {
        const web3Accounts = await web3.eth.getAccounts();
        const selectedWeb3Account = web3Accounts[0];
        this.setState({
            selectedWeb3Account
        });
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="alert alert-info" role="alert">
                            <div>Your selected Web3 account is: {this.state.selectedWeb3Account}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}