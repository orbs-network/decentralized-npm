const { Client, NetworkType, createAccount } = require('orbs-client-sdk');
const GammaDriver = require('../../../tests/gamma.driver');
const OwnershipService = require('./ownership');

describe('Owners Contract', () => {
  const contractName = 'owners';
  const gammaDriver = new GammaDriver();
  const orbsClient = new Client(gammaDriver.getEndpoint(), 42, NetworkType.NETWORK_TYPE_TEST_NET);

  const { publicKey } = createAccount();

  const npmrcMock = {
    getPublicKey() {
      return publicKey;
    },
  };

  let ownershipService;

  beforeAll(async () => {
    await gammaDriver.start();
  });

  afterAll(async () => {
    await gammaDriver.stop();
  });

  beforeEach(async () => {
    await gammaDriver.deployContract(
      contractName,
      `${process.cwd()}/src/contracts/${contractName}.go`,
    );
    ownershipService = new OwnershipService(orbsClient, npmrcMock);
  });

  describe('addOwner', () => {
    it('should add first owner', () => { });
  });

  describe('hasOwner', () => {
    it('should throw an error if package name is not passed', async () => {
      try {
        await ownershipService.hasOwner();
      } catch (err) {
        expect(err.message).toEqual('Method `hasOwner` expects package name as an argument');
      }
    });

    it('should return false for non-registered package', async () => {
      const res = await ownershipService.hasOwner('some-package');
      expect(res).toEqual(false);
    });
  });
});
