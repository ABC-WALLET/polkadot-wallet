//  // Initialize recipient account
//     const recipient = keyring.addFromMnemonic(recipientPKEY);
//     const recipientAddr = recipient.address;
//     console.log("recipient wallet address", recipientAddr)

//     // Transfer tokens
//     const transfer = api.tx.balances.transfer(recipientAddr, txAmount);

//     // Sign and send transaction using sender account
//     const hash = await transfer.signAndSend(sender);
   const transferDot = async (senderPKEY, recipientPKEY, txAmount) => {
    const wsProvider = new wsProvider('wss://westend-rpc.polkadot.io');
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

// // }

const checkBalance = async (address) => {
    const provider = new WsProvider('wss://westend-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });
    const { data: { free: balance } } = await api.query.system.account(address);
    console.log(`Account balance: ${balance}`);
  }


  checkBalance(" 5HSSeyPRxNGs2e5qpmJYxMeM3k4NAwGvT8ZBmZBG2m79KKfF");
  transferDot();