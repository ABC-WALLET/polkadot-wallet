const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');

const explorerUrl = 'https://polkadot.subscan.io/';

const transferDot = async (senderPKEY, recipientPKEY, txAmount) => {
  const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });

  // Initialize sender account from the mnemonic
  const senderKeyring = new Keyring({ type: 'sr25519' });
  const sender = senderKeyring.addFromMnemonic(senderPKEY);
  const senderAddr = sender.address;

  // Log sender address and balance
  const senderBalance = await api.query.system.account(senderAddr);
  console.log(`Sender address: ${senderAddr}`);
  console.log(`Sender balance: ${senderBalance.data.free.toHuman()}`);

  // Initialize recipient account
  const recipientKeyring = new Keyring({ type: 'sr25519' });
  const recipient = recipientKeyring.addFromMnemonic(recipientPKEY);
  const recipientAddr = recipient.address;

  // Log recipient address
  console.log(`Recipient address: ${recipientAddr}`);

  // Convert txAmount to a Compact<u128> value
  const txAmountCompact = api.createType('Compact<u128>', txAmount);

  // Create transfer transaction
  const transferTx = api.tx.balances.transfer(recipientAddr, txAmountCompact);

  // Sign and send transaction using sender account
  const hash = await transferTx.signAndSend(sender);

  // Log transaction hash and explorer link
  console.log(`Transaction hash: ${hash.toHex()}`);
  console.log(`Explorer link: ${explorerUrl}extrinsic/${hash.toHex()}`);

  // Return transaction hash and explorer link
  return {
    hash: hash.toHex(),
    explorerLink: `${explorerUrl}extrinsic/${hash.toHex()}`
  };
}
