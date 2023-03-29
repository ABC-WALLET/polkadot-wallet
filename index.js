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

generateAccount()