
const { Keyring } = require('@polkadot/keyring');
// const provider = new WsProvider('wss://rpc.polkadot.io');
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { mnemonicGenerate } = require('@polkadot/util-crypto');


const generateAccount= async()=>{
    const keyring = new Keyring({ type: 'ed25519' });
    const mnemonic = mnemonicGenerate();
    const account =   keyring.addFromMnemonic(mnemonic);
    const publicKey = account.address;
    const privateKey = account.secret;
    console.log(account)
    console.log(`Address: ${account.address}`);
    console.log(`Mnemonic: "${mnemonic}"`);
    const details ={privateKey,publicKey}
    return details;


}


const getBalance = async (address)=>{
    const provider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });
    const { data: { free: balance } } = await api.query.system.account(address);
    console.log(`Account balance: ${balance}`);

}

generateAccount()
getBalance("5GeeAX6ujmh4NBX4VJ9TUJXtD6qzLHq7vSbkmcZ1FP994PrG")