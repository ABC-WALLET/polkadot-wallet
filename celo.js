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

  return{
    balance
  }

}


 const  Createuse= async()=>{
  const balance = await HdWallet.getBalance
}
Createuse()

createWallet().then((wallet) => {
  console.log('Public key:', wallet.publicKey);
  console.log('Private key:', wallet.privateKey);
  console.log('Mnemonic:', wallet.mnemonic);
});
