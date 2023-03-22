const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const provider = new WsProvider('wss://rpc.polkadot.io');




const CreateAccount = async()=>{

//generate key
const api = await ApiPromise.create({ provider });
const keyring = new Keyring({ type: 'sr25519' });
const alice = keyring.addFromUri('//Alice');



console.log(alice)


}


const getBalance = async()=>{
    const api = await ApiPromise.create({ provider });
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');

    const balance = await api.query.system.account(alice.address);

    console.log(balance)
}

CreateAccount()
getBalance()