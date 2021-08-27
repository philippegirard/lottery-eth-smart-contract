require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')

const provider = new HDWalletProvider(
    process.env['META_MNEMONIC'],
    process.env['INFURA_ENDPOINT']
)

const web3 = new Web3(provider);

const deploy = async () => {
    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts[0])

    const deployerAddress = process.env["DEPLOYER_ACCOUNT_ADDR"];
    console.log("attempting to deploy from ", deployerAddress)
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ["Hi there!"]
        })
        .send({
            gas: "1000000",
            gasPrice: '5000000000',
            from: deployerAddress
        })

    console.log("Contact deployed to", result.options.address)
    // 0xC0deE29B0debA88F8425C03B6D285dE3660Ec38F
}
deploy();