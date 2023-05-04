const bip39 = require('bip39');
const { HDWallet } = require('@celo/wallet-hd');

async function createWallet() {
  const mnemonic = bip39.generateMnemonic();
  const wallet = await HDWallet.fromMnemonic(mnemonic);
  const privateKey = wallet.getPrivateKey().toString('hex');
  const publicKey = wallet.getPublicKey().toString('hex');

  return {
    privateKey,
    publicKey,
    mnemonic,
  };
}
const getCeloBalance = async(address)=>{
  const balance = await  HdWallet.getBalance(addres)
  const fee = await balance - address;

  return{
    balance;
    fee;
  }
// add more rols

const role = async (role)=>{
  const role = req.body.role
  if(role === admin){
    return admin
  }
}
}


 const  Createuse= async(fee)=>{
  const balance = await HdWallet.getBalance;
  const sale  =  balance - fee

  return {
    balance 
  }
}

const addMember = async (memberNo)=>{
  const number = await req.body(memberNo){
    return number
  }
}
Createuse(100)

createWallet().then((wallet) => {
  console.log('Public key:', wallet.publicKey);
  console.log('Private key:', wallet.privateKey);
  console.log('Mnemonic:', wallet.mnemonic);
});
