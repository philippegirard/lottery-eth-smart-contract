import web3 from "./web3";

const address = "0x02F0D639D089Db05c34764d0A8A47f7aaBA63Ca7"

const abi = [
    {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
    {
        inputs: [],
        name: 'enter',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getBalance',
        outputs: [[Object]],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getPlayers',
        outputs: [[Object]],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'lastWinner',
        outputs: [[Object]],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'manager',
        outputs: [[Object]],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'pickWinner',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [[Object]],
        name: 'players',
        outputs: [[Object]],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'random',
        outputs: [[Object]],
        stateMutability: 'view',
        type: 'function'
    }
]


const contract = new web3.eth.Contract(abi, address);
export {address, contract};