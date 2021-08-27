import "./App.css";
import React from "react";
import lottery from "./lottery";
import web3 from "./web3";

class App extends React.Component {
    state = {
        manager: '',
        players: [],
        balance: '',
        value: 0,
        loading: false,
        loadingMessage: "",
    }

    async componentDidMount() {
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({
            manager,
            players,
            balance
        })
    }

    // gasPrice: '5000000000'
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
            loadingMessage: "Waiting for transaction... Do not reload the page.",
        })

        try {
            const accounts = await web3.eth.getAccounts();

            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether'),
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

    render() {
        return (
            <div style={{padding: "10px"}}>
                <h2>Lottery Contract</h2>
                <p>This contract is managed by {this.state.manager}</p>
                <p>There are currently {this.state.players.length} people entered,
                    competing to win {web3.utils.fromWei(this.state.balance)} ether!
                </p>
                <hr/>
                <form onSubmit={this.onSubmit}>
                    <h4>Want to try your luck?</h4>
                    <div>
                        <label>Amount of ether to enter</label>
                        <input
                            value={this.state.value}
                            onChange={event => this.setState({value: event.target.value})}
                        />
                        <span> (min 0.1 ether)</span>
                    </div>
                    <button disabled={this.state.loading}>Enter</button>
                </form>
                <hr/>
                <h1>{this.state.loadingMessage}</h1>
            </div>
        );
    }
}

export default App;
