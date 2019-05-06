const { argString, encodeHex, argAddress, decodeHex } = require('orbs-client-sdk');

const CONTRACT_NAME = 'owners';
const addressLength = 20;

class OwnershipService {
  constructor(orbsClient, npmrc) {
    this.orbsClient = orbsClient;
    this.npmrc = npmrc;
  }

  addOwner(pkgName, address) {
    const [tx] = this.orbsClient.createTransaction(
      decodeHex(this.npmrc.getPublicKey()),
      decodeHex(this.npmrc.getPrivateKey()),
      CONTRACT_NAME,
      'addOwner',
      [argString(pkgName), argAddress(address)],
    );

    return this.orbsClient.sendTransaction(tx);
  }

  async getOwners(pkgName) {
    const query = this.orbsClient.createQuery(
      decodeHex(this.npmrc.getPublicKey()),
      CONTRACT_NAME,
      'getOwners',
      [argString(pkgName)],
    );

    const { outputArguments } = await this.orbsClient.sendQuery(query);
    const owners = outputArguments[0].value;
    const amountOfOwners = owners.length / addressLength;
    const chunks = Array.from(Array(amountOfOwners), () =>
      Array.from(Array(addressLength), () => 0),
    );
    return chunks
      .map((chunk, x) => chunk.map((_, y) => owners[x * addressLength + y]))
      .map(chunk => encodeHex(new Uint8Array(chunk)));
  }
}
module.exports = OwnershipService;
