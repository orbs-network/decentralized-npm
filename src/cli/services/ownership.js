const { argString } = require('orbs-client-sdk');

const CONTRACT_NAME = 'owners';

class OwnershipService {
  constructor(orbsClient, npmrc) {
    this.orbsClient = orbsClient;
    this.npmrc = npmrc;
  }

  async hasOwner(pkgName) {
    if (pkgName === undefined) {
      throw new Error('Method `hasOwner` expects package name as an argument');
    }
    if (typeof pkgName !== 'string') {
      throw new Error('Package name should be a string');
    }
    const query = this.orbsClient.createQuery(
      this.npmrc.getPublicKey(),
      CONTRACT_NAME,
      'hasOwner',
      [argString(pkgName)],
    );

    const { outputArguments } = await this.orbsClient.sendQuery(query);
    return Boolean(outputArguments[0].value);
  }

  addOwner(pkgName, publicKey) {}
  isOwner(pkgName, publicKey) {}
}
module.exports = OwnershipService;
