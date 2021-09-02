import React from "react";
import web3 from "./web3";
import {address} from "./lottery";

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
                            <div>This <a href={"https://rinkeby.etherscan.io/address/" + address} target="_blank"
                                         rel="noreferrer">contract</a> is deployed on the Rinkeby network.
                            </div>
                            <div style={{ marginTop: '5px'}}>
                                <a href="https://www.loom.com/share/48a64e2e31444589944bdd4ef6188d2b" target="_blank">
                                    <button
                                        class="btn btn-info"
                                    >
                                        Watch Demo Video
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}