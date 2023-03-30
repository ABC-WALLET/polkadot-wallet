const { ApiPromise, WsProvider, Keyring, createType } = require('@polkadot/api');
const { createType } = require('@polkadot/types');


async function transfer(from, to, amount, seedPhrase) {
  const provider = new WsProvider('wss://westend-rpc.polkadot.io');
  const api = await ApiPromise.create({ provider });

  const keyring = new Keyring({ type: 'sr25519' });
  const fromPair = keyring.addFromUri(seedPhrase);

  const tx = api.tx.balances.transfer(toAddress, amount);
  const txHash = await tx.signAndSend(fromPair);
  


  console.log(`Transfer sent with hash ${txHash}`);
}

// Example usage
const from = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const to = '5F5cWbP8X9GuC5ZL98iWyjEuxvy1Hc2xMGyDCwA5fdh54Jex';
const amount = 1 * 1e9;
const seedPhrase = '//Alice';

transfer(from, to, amount, seedPhrase);
