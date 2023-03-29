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



  //transfer function

const { ApiPromise, Keyring, WsProvider } = require('@polkadot/api');

const transfer = async (senderMnemonic, recipientAddress, amount) => {
  // Connect to the Polkadot network using a WebSocket provider
  const provider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider });

  // Create a keyring instance and add the sender account from the provided mnemonic
  const keyring = new Keyring({ type: 'sr25519' });
  const sender = keyring.addFromMnemonic(senderMnemonic);

  // Send the transfer transaction using the Polkadot.js API
  const txHash = await api.tx.balances.transfer(recipientAddress, amount).signAndSend(sender);

  console.log(`Transfer sent with hash ${txHash}`);
};


checkBalance('0xAD5c976acA555b1C5Ed7c801e1e5f708070AA61d')

generateAccount()

transfer()