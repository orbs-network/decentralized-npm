const { Client, NetworkType, createAccount, encodeHex } = require('orbs-client-sdk');
const GammaDriver = require('../../../tests/gamma.driver');
const OwnershipService = require('./ownership');

// Note! This test is stateful due to docker of gamma
// Restart of docker per test takes about 10 sec.
// Therefore, we start it once before all tests.
describe('Owners Contract', () => {
  const contractName = 'owners';
  const gammaDriver = new GammaDriver();
  const orbsClient = new Client(gammaDriver.getEndpoint(), 42, NetworkType.NETWORK_TYPE_TEST_NET);

  const account1 = createAccount();

  const npmrcMock = {
    getPublicKey() {
      return account1.publicKey;
    },
    getPrivateKey() {
      return account1.privateKey;
    },
  };

  let ownershipService;

  beforeAll(async () => {
    await gammaDriver.start();
    await gammaDriver.deployContract(
      contractName,
      `${process.cwd()}/src/contracts/${contractName}.go`,
    );
    ownershipService = new OwnershipService(orbsClient, npmrcMock);
  });

  afterAll(async () => {
    await gammaDriver.stop();
  });

  describe('addOwner', () => {
    it('should package does not registered, add calling user as the first owner', async () => {
      const account2 = createAccount();
      const packageName = 'testPackage1';
      await ownershipService.addOwner(packageName, account2.address);
      const owners = await ownershipService.getOwners(packageName);
      expect(owners).toEqual([account1.address, account2.address]);
    });

    it('should not add an owner who is already in the list', async () => {
      const account2 = createAccount();
      const packageName = 'testPackage2';
      await ownershipService.addOwner(packageName, account2.address);
      await ownershipService.addOwner(packageName, account2.address);
      const owners = await ownershipService.getOwners(packageName);
      expect(owners).toEqual([account1.address, account2.address]);
    });
  });
});
