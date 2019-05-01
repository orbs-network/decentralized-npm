const { execSync } = require('child_process');
const NpmrcService = require('./npmrc');

describe('npmrc service', () => {
  const tmpFolderName = `tmp+${Math.random()}`;
  const npmrcService = new NpmrcService(`${process.cwd()}/${tmpFolderName}`);

  beforeEach(() => {
    execSync(`mkdir ${tmpFolderName}`);
  });

  afterEach(() => {
    execSync(`rm -rf ${tmpFolderName}`);
  });

  it('should create a file if it does not exists', () => {
    expect(npmrcService.exists()).toBeFalsy();
    npmrcService.create();
    expect(npmrcService.exists()).toBeTruthy();
  });

  it('should have a default registry', () => {
    npmrcService.create();
    expect(npmrcService.get('registry')).toEqual('https://registry.npmjs.org');
  });

  it('should return null for non-existing record', () => {
    npmrcService.create();
    expect(npmrcService.get('some-record')).toEqual(null);
  });

  it('should set the a new value under a given key', () => {
    npmrcService.create();
    npmrcService.set('test-key', 'test');
    expect(npmrcService.get('test-key')).toEqual('test');
  });

  it('should override the value if key exists', () => {
    const testKey = 'test-key';
    npmrcService.create();
    npmrcService.set(testKey, 'test1');
    npmrcService.set(testKey, 'test2');
    expect(npmrcService.get(testKey)).toEqual('test2');
  });
});
