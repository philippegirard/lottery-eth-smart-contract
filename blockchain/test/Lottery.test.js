const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const {abi, bytecode} = require("../compile");

let lottery;
let accounts;
let managerAccount;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    managerAccount = accounts[0];

    lottery = await new web3.eth.Contract(abi)
        .deploy({data: bytecode})
        .send({
            from: managerAccount,
            gas: "1000000"
        });
});

describe("Lottery Contract", () => {
    it("deploys a contract", () => {
        assert.ok(lottery.options.address);
    });

    it("allows one account to enter", async () => {
        await lottery.methods.enter().send({
            from: managerAccount,
            value: web3.utils.toWei("0.1", "ether"),
        });

        const players = await lottery.methods.getPlayers().call({
            from: managerAccount,
        });

        assert.equal(managerAccount, players[0]);
        assert.equal(1, players.length);
    });

    it("allows multiple accounts to enter", async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("0.1", "ether"),
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei("0.1", "ether"),
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei("0.1", "ether"),
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0],
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it("requires a 0.1 ether to enter", async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0.2,
            });
            assert(false);
        } catch (err) {
            assert(err);
        }

        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0,
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it("only manager can call pickWinner", async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1],
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it("sends money to the winner and resets the players array", async () => {
        await lottery.methods.enter().send({
            from: managerAccount,
            value: web3.utils.toWei("0.1", "ether"),
        });

        const initialBalance = await web3.eth.getBalance(managerAccount);
        await lottery.methods.pickWinner().send({
            from: managerAccount,
        });
        const finalBalance = await web3.eth.getBalance(managerAccount);
        const difference = finalBalance - initialBalance;

        assert(difference > web3.utils.toWei("0.01", "ether"));
    });

    it ('can get lastWinner', async () => {
        await lottery.methods.enter().send({
            from: managerAccount,
            value: web3.utils.toWei("0.1", "ether"),
        });

        await lottery.methods.pickWinner().send({
            from: managerAccount,
        });

        const lastWinner = await lottery.methods.lastWinner().call();
        assert.equal(managerAccount, lastWinner);
    })
});
