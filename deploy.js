require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    process.env['META_MNEMONIC'],
    process.env['INFURA_ENDPOINT']
)