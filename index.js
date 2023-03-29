// index.js
const { ApiPromise, WsProvider } = require('@polkadot/api');

const connect = async () => {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = new ApiPromise({ provider: wsProvider });
    return api.isReady;
};

connect().then((api) => {
    console.log(`Our client is connected: ${api.isConnected}`);
}).catch((err) => {
    console.error(err)
}).finally(() => process.exit());

//create an accounts

const generateAccount = async()=>{
    const { mnemonicGenerate } = require('@polkadot/util-crypto');
    const { Keyring } = require('@polkadot/keyring');
    const keyring = new Keyring({ type: 'ethereum' });
    const mnemonic = mnemonicGenerate();
    const account =   keyring.addFromMnemonic(mnemonic);
    console.log(`Address: ${account.address}`);
    console.log(`Mnemonic: "${mnemonic}"`);
    
}

// const getBalance = async()=>{
//     const { data: { free: balance } } = await api.query.system.account(alice.address);
//     console.log(`Alice's balance is ${balance} units`);
    



// }

const checkBalance = async (address) => {
    const provider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });
    const { data: { free: balance } } = await api.query.system.account(address);
    console.log(`Account balance: ${balance}`);
  }

checkBalance('0xAD5c976acA555b1C5Ed7c801e1e5f708070AA61d')

generateAccount()
