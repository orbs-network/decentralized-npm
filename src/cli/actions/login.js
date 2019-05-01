const { createAccount, encodeHex } = require('orbs-client-sdk');
const NpmrcService = require('../services/npmrc');

const npmrcService = new NpmrcService();

const login = () => {
  if (!npmrcService.exists()) {
    npmrcService.create();
  }
  if (!npmrcService.get('user_public_key')) {
    const account = createAccount();
    npmrcService.set('user_public_key', encodeHex(account.publicKey));
    npmrcService.set('user_private_key', encodeHex(account.privateKey));
  }
  return npmrcService.get('user_public_key');
};

module.exports = login;
