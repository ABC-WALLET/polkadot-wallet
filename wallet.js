
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


const transferDot = async (senderPKEY, recipientPKEY, txAmount) => {
    const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });


    // Initialize account from the mnemonic
    const keyring = new Keyring({type: 'sr25519'});
    const sender = keyring.addFromMnemonic(senderPKEY);
    const senderAddr = sender.address
    const balance = await getBalance(senderAddr)
    console.log("sender wallet address")
    console.log("sender balance", balance)

    // Initialize recipient account
    const recipient = keyring.addFromMnemonic(recipientPKEY);
    const recipientAddr = recipient.address;
    console.log("recipient wallet address", recipientAddr)

    // Transfer tokens
    const transfer = api.tx.balances.transfer(recipientAddr, txAmount);

    // Sign and send transaction using sender account
    const hash = await transfer.signAndSend(sender);

    console.log("Transaction hash:", hash.toHex());
    console.log("Explorer link:", `${explorerUrl}extrinsic/${hash.toHex()}`);

    // // Return transaction hash and link to explorer
    // return {
    //     hash: hash.toHex(),
    //     explorerLink: `${explorerUrl}extrinsic/${hash.toHex()}`
    // };
}

generateAccount()
getBalance("5GeeAX6ujmh4NBX4VJ9TUJXtD6qzLHq7vSbkmcZ1FP994PrG")
transferDot("sponsor file start tube scout gallery dance volcano neutral flavor senior admit","true crime ensure pig unique odor clarify access kid ship era exist","0.0001")