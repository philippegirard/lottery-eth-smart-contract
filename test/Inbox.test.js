const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3')
const {interface, bytecode} = require('../compile')

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ["Hi there!"]
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        })

})

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(accounts)
    });
})