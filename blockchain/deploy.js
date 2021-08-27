require('dotenv').config();

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const {abi, bytecode} = require("./compile");

const provider = new HDWalletProvider(
    process.env['META_MNEMONIC'],
    process.env['INFURA_ENDPOINT']
)

const web3 = new Web3(provider);


const deploy = async () => {
    // const accounts = await web3.eth.getAccounts();
    const deployerAddress = process.env["DEPLOYER_ACCOUNT_ADDR"];

    console.log("Attempting to deploy from account", deployerAddress);

    const result = await new web3.eth.Contract(abi)
        .deploy({data: bytecode})
        .send({
            gas: "1000000",
            gasPrice: '5000000000',
            from: deployerAddress
        });

    console.log("Contract deployed to", result.options.address);
    // 0x7D8a5d717CC8FE6642913c94F9D82b0d0315Bef5
};
deploy()