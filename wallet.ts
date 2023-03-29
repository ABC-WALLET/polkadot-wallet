const { Keyring } = require('@polkadot/keyring');

const { ApiPromise, WsProvider } = require('@polkadot/api');

async function initApi() {
  const provider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider });
  const keyring = new Keyring({ type: 'sr25519' });
  const pair = keyring.addPair();

  const publicKey = pair.publicKey;
  const privateKey = pair.secretKey;

  return { privateKey, publicKey };
  // use the API here...
}


// Example usage
const account = initApi();
console.log('Private key:', account.privateKey.toString());
console.log('Public key:', account.publicKey.toString());
