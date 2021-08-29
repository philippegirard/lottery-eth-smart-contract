import "./App.css";
import React from "react";
import {address, contract as lottery} from "./lottery";
import web3 from "./web3";

class App extends React.Component {
    state = {
        manager: '',
        players: [],
        lastWinner: '',
        balance: '',
        loading: false,
        enterMessage: "",
        pickWinnerMessage: "",
    }

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const lastWinner = await lottery.methods.lastWinner().call();
        console.log(lastWinner);
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({
            manager,
            players,
            lastWinner,
            balance
        })
    }

    enterContest = async (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
            loadingMessage: "Waiting for transaction... Do not reload the page.",
        })

        try {
            const accounts = await web3.eth.getAccounts();

            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei(0.1.toString(), 'ether'),
            });

            this.setState({
                enterMessage: "Success! You have been entered!",
            });
        } catch (e) {
            this.setState({
                enterMessage: "Rejected. The transaction was stopped.",
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
            pickWinnerMessage: "Waiting for transaction..."
        });

        try {
            const accounts = await web3.eth.getAccounts();

            await lottery.methods.pickWinner().send({
                from: accounts[0]
            })

            this.setState({
                pickWinnerMessage: "Success! A winner has been picked."
            })
        } catch (e) {
            this.setState({
                pickWinnerMessage: "Rejected. The transaction was stopped."
            })
        } finally {
            this.setState({loading: false})
        }

    }

    render() {
        return (
            <div style={{padding: "10px"}}>
                <h2>Lottery Contract</h2>
                <p>This contract is managed by {this.state.manager}</p>
                <p>There are currently {this.state.players.length} people entered,
                    competing to win {web3.utils.fromWei(this.state.balance)} ether!
                </p>
                <p>The last winner was: {this.state.lastWinner}</p>
                <hr/>
                <h4>Want to try your luck?</h4>
                <div>
                    <label>Send 0.1 Ether to enter</label>
                </div>
                <button
                    onClick={this.enterContest}
                    disabled={this.state.loading}
                >
                    Enter
                </button>
                <hr/>

                <h4>Ready to pick a winner?</h4>
                <button onClick={this.pickWinner}>Pick a winner!</button>
                <p>You need to be the manager ({this.state.manager}) to run this function</p>
                <hr/>

                <h4>Contract information</h4>
                <p>
                    <a href={"https://rinkeby.etherscan.io/address/" + address} target="_blank" rel="noreferrer">
                        View contract on etherscan (Rinkeby)
                    </a>
                </p>
                <p>
                    <a href={"https://github.com/philippegirard/eth-smart1"} target="_blank" rel="noreferrer">
                        View contract source code on GitHub
                    </a>
                </p>
            </div>
        );
    }
}

export default App;
