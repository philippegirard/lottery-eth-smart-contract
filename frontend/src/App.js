import "./App.css";
import React from "react";
import AboutContract from "./AboutContract"
import LotteryContractFrontend from "./LotteryContractFrontend";
import Banner from "./Banner";

class App extends React.Component {


    render() {
        return (
            <div style={{padding: "10px"}}>
                <Banner/>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <LotteryContractFrontend/>
                        </div>

                        <div className="col">
                            <AboutContract/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
