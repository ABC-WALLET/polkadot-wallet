
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const provider = new WsProvider('wss://rpc.polkadot.io');
const Transfer =async()=>{

    const  senderPKEY= ("know tired initial gain deputy weather luggage weird control crucial also wealth");
    const  receipientPKEY  ="5GFPTYzW2LjPXj6w2W39bbWJ5uKBzUHZn743mT27YuTRc5r4"
    const keyring = new Keyring({type: 'sr25519'});
    const sender = keyring.addFromMnemonic(senderPKEY);
    const senderAddr = sender.address
    // Initialize recipient account
    const recipient = keyring.addFromMnemonic(recipientPKEY);
    const recipientAddr = recipient.address;
    console.log("recipient wallet address", recipientAddr)

    // Transfer tokens
    const transfer = api.tx.balances.transfer(recipientAddr, txAmount);

    // Sign and send transaction using sender account
    const hash = await transfer.signAndSend(sender);

}

Transfer()