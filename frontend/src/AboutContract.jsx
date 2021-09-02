import React from "react";
import {address} from "./lottery";
import philPic from "./philippe.jpg";

export default class AboutContract extends React.Component {

    render() {
        return (
            <>
                <h2>About the contract</h2>

                <p>
                    <a href={"https://github.com/philippegirard/eth-smart1"} target="_blank"
                       rel="noreferrer">
                        View contract source code on GitHub
                    </a>
                </p>
                <p>
                    <a href={"https://rinkeby.etherscan.io/address/" + address} target="_blank"
                       rel="noreferrer">
                        View contract on Etherscan (Rinkeby)
                    </a>
                </p>
                <p>
                    <a href="https://faucet.rinkeby.io/" target="_blank" rel="noreferrer">
                        Get test ETH on Rinkeby Faucet
                    </a>
                </p>
                <hr/>

                <h4>Made by Philippe Girard</h4>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div>
                        <img src={philPic}
                             style={{width: "80px"}}
                             className="rounded float-start img-thumbnail"
                             alt={"philippe girard"}
                        />
                    </div>
                    <div style={{marginLeft: "10px"}}>
                        <div>
                            <a href={"https://github.com/philippegirard"} target="_blank" rel="noreferrer">
                                GitHub
                            </a>
                        </div>
                        <div>
                            <a href={"https://www.linkedin.com/in/philgirard/"} target="_blank"
                               rel="noreferrer">
                                LinkedIn
                            </a>
                        </div>
                        <div>
                            <a href={"https://twitter.com/radphilx"} target="_blank" rel="noreferrer">
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}