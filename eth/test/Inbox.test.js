const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3')
const {interface, bytecode} = require('../compile')

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
let initialMessage = "Hi there!";
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: [initialMessage]
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        })

})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, initialMessage)
    })

    it('can change the message', async () => {
        const expectedMessage = 'bye';
        await inbox.methods.setMessage(expectedMessage).send({
            from: accounts[0]
        })
        const message = await inbox.methods.message().call();
        assert.equal(message, expectedMessage);
    })
})