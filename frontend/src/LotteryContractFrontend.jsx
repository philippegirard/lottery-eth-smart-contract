import React from "react";
import {contract as lottery} from "./lottery";
import web3 from "./web3";

export default class LotteryContractFrontend extends React.Component {
    state = {
        selectedWeb3Account: '',
        manager: '',
        players: [],
        lastWinner: '',
        balance: '',
        showPlayers: false,
        loading: false,
        loadingMessage: '',
    }

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const lastWinner = await lottery.methods.lastWinner().call();
        const balance = await web3.eth.getBalance(lottery.options.address);

        const web3Accounts = await web3.eth.getAccounts();
        const selectedWeb3Account = web3Accounts[0];

        this.setState({
            web3Accounts,
            selectedWeb3Account,
            manager,
            players,
            lastWinner,
            balance
        })

        // hide no-metamask warning
        document.getElementById("nometamask").style.visibility = "hidden";
        document.getElementById("nometamask").style.display = "none";
    }

    enterContest = async (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
            loadingMessage: "Waiting for enterContest() transaction... Do not reload the page.",
        })

        try {

            await lottery.methods.enter().send({
                from: this.state.selectedWeb3Account,
                value: web3.utils.toWei(0.1.toString(), 'ether'),
            });

            this.setState({
                loadingMessage: "Success! You have been entered!",
            });
        } catch (e) {
            this.setState({
                loadingMessage: "Rejected. The transaction was stopped.",
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    }

    pickWinner = async (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
            loadingMessage: "Waiting for pickWinner() transaction..."
        });

        try {
            await lottery.methods.pickWinner().send({
                from: this.state.selectedWeb3Account,
            })

            this.setState({
                loadingMessage: "Success! A winner has been picked."
            })
        } catch (e) {
            this.setState({
                loadingMessage: "Rejected. The transaction was stopped."
            })
        } finally {
            this.setState({
                loading: false,
            })
        }

    }

    render() {
        // player's list
        let playersListLi = [];
        for (let i = 0; i < this.state.players.length; i++) {
            const playerAddr = this.state.players[i];
            playersListLi.push(<li key={`${i}-${playerAddr}`}>{playerAddr}</li>)
        }
        if (this.state.players.length <= 0) {
            playersListLi = [<li key="0-part">No participant yet.</li>]
        }

        return (
            <>
                <h1>Lottery Contract</h1>
                <p>This contract is managed by {this.state.manager}</p>
                <p>There are currently {this.state.players.length} people entered,
                    competing to win {web3.utils.fromWei(this.state.balance)} ether!
                </p>
                <p>The last winner was: {this.state.lastWinner}</p>
                <button className="btn btn-primary"
                        disabled={this.state.loading}
                        onClick={() => {
                            this.setState({showPlayers: !this.state.showPlayers})
                        }}
                >
                    Show participants
                </button>
                {this.state.showPlayers &&
                <div style={{marginTop: '10px'}}>
                    <ul>
                        {playersListLi}
                    </ul>
                </div>}
                <hr/>

                <h4>Want to try your luck?</h4>
                <div>
                    <label>Send 0.1 Ether to enter</label>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={this.enterContest}
                    disabled={this.state.loading}
                >
                    Enter
                </button>
                <hr/>

                <h4>Ready to pick a winner?</h4>
                <button
                    className="btn btn-primary"
                    disabled={this.state.loading}
                    onClick={this.pickWinner}>Pick a winner!
                </button>
                <p>You need to be the manager ({this.state.manager}) to run this function</p>

                {this.state.loadingMessage != '' &&
                <div>
                    <div className="alert alert-warning" role="alert">
                        <div>
                            {this.state.loadingMessage}
                        </div>
                        {this.state.loading &&
                        <div style={{textAlign: "center", marginTop: '10px'}}>
                            <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>}
                    </div>
                </div>}
            </>
        )
    }
}