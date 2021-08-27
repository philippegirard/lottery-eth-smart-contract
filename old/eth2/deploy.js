require('dotenv').config();

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");

const provider = new HDWalletProvider(
    process.env['META_MNEMONIC'],
    process.env['INFURA_ENDPOINT']
)

const web3 = new Web3(provider);

const deploy = async () => {
    // const accounts = await web3.eth.getAccounts();
    const deployerAddress = process.env["DEPLOYER_ACCOUNT_ADDR"];

    console.log("Attempting to deploy from account", deployerAddress);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({
            gas: "1000000",
            gasPrice: '5000000000',
            from: deployerAddress
        });

    console.log("Contract deployed to", result.options.address);
    // 0x2DA348378a295D61B476C52Ce8582574584a3DdC
};
deploy();
