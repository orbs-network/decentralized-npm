const { createAccount, encodeHex } = require('orbs-client-sdk');

const login = npmrc => () => {
  if (!npmrc.hasPublicKey('user_public_key')) {
    const account = createAccount();
    npmrc.setPublicKey(encodeHex(account.publicKey));
    npmrc.setPrivateKey(encodeHex(account.privateKey));
    npmrc.setAddress(account.address);
  }
  return npmrc.getAddress();
};

module.exports = login;
