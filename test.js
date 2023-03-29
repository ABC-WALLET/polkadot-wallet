const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const provider = new WsProvider('wss://rpc.polkadot.io');




const CreateAccount = async()=>{
//generate key
const api = await ApiPromise.create({ provider });
const keyring = new Keyring({ type: 'sr25519' });
// const alice = keyring.addFromUri('//Alice');
const pair = keyring.addPair();
const publicKey = pair.publicKey;
const privateKey = pair.secretKey;
console.log(alice,privateKey,publicKey)


}


const getBalance = async()=>{
    const api = await ApiPromise.create({ provider });
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice');

    const balance = await api.query.system.account(alice.address);

    console.log(balance)
}

// const  Transfer = async(req,res)=>{
//     const api = await ApiPromise.create({ provider });
//     const { to, amount } = req.body;
//     const tx = api.tx.balances.transfer(to, amount);
//     const { nonce } = await api.query.system.account(alice.address);
//     const { signature } = await tx.signAsync(alice, { nonce });
//     const txHash = await tx.send(async ({ events = [], status }) => {
//       if (status.isInBlock) {
//         console.log(`Transaction included at block hash ${status.asInBlock}`);
//         console.log(`Events:`);
//         console.log(events);
//       } else if (status.isFinalized) {
//         console.log(`Transaction finalized at block hash ${status.asFinalized}`);
//       }
//     });
//     res.send(`Transfer of ${amount} units to ${to} was successful`);
    
   
    

// }

const walletFee =()=>{
  const  walletfee = 0.002* 10
}

const swapFee  =()=>{

  const swapfee = 0.0001
}

CreateAccount()
swapFee()
getBalance()

walletFee()