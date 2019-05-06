const { execSync } = require('child_process');
const NpmrcService = require('./npmrc');

describe('npmrc service', () => {
  const tmpFolderName = `tmp+${Math.random()}`;
  const npmrc = new NpmrcService(`${process.cwd()}/${tmpFolderName}`);

  beforeEach(() => {
    execSync(`mkdir ${tmpFolderName}`);
  });

  afterEach(() => {
    execSync(`rm -rf ${tmpFolderName}`);
  });

  it('should create a file if it does not exists', () => {
    expect(npmrc.exists()).toBeFalsy();
    npmrc.create();
    expect(npmrc.exists()).toBeTruthy();
  });

  it('should have a default registry', () => {
    npmrc.create();
    expect(npmrc.get('registry')).toEqual('https://registry.npmjs.org');
  });

  it('should has a default orbs node address and vitrual chain', () => {
    npmrc.create();
    expect(npmrc.get('orbs_address')).toEqual('http://localhost:8080');
    expect(npmrc.get('virtual_chain_id')).toEqual('42');
  });

  it('should return null for non-existing record', () => {
    npmrc.create();
    expect(npmrc.get('some-record')).toEqual(null);
  });

  it('should set the a new value under a given key', () => {
    npmrc.create();
    npmrc.set('test-key', 'test');
    expect(npmrc.get('test-key')).toEqual('test');
  });

  it('should override the value if key exists', () => {
    const newRegistry = 'https://my-new-registry';
    npmrc.create();
    npmrc.set('registry', newRegistry);
    expect(npmrc.get('registry')).toEqual(newRegistry);
  });

  it('should get/set public key', () => {
    npmrc.create();
    expect(npmrc.hasPublicKey()).toBeFalsy();
    npmrc.setPublicKey('my-public-key');
    expect(npmrc.hasPublicKey()).toBeTruthy();
    expect(npmrc.getPublicKey()).toEqual('my-public-key');
  });

  it('should get/set private key', () => {
    npmrc.create();
    npmrc.setPrivateKey('my-private-key');
    expect(npmrc.getPrivateKey()).toEqual('my-private-key');
  });
});
