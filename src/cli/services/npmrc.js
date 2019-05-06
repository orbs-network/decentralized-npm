const fs = require('fs');

const defaultFilename = '.npmrc';
const defaultRegisty = 'https://registry.npmjs.org';
const defaultOrbsNode = 'http://localhost:8080';
const defaultVirtualChainId = '42';

const fieldToMethodName = field => {
  const [key] = field.split('Field');
  return key
    .split('')
    .map((char, idx) => (idx === 0 ? char.toUpperCase() : char))
    .join('');
};

const createGetterSetterFn = instance => {
  const fields = Object.keys(instance).filter(attribute => attribute.endsWith('Field'));
  fields.forEach(field => {
    const methodName = fieldToMethodName(field);
    // eslint-disable-next-line no-param-reassign
    instance[`get${methodName}`] = () => instance.get(instance[field]);
    // eslint-disable-next-line no-param-reassign
    instance[`set${methodName}`] = val => instance.set(instance[field], val);
  });
};

class NpmrcService {
  constructor(configFolder = process.cwd()) {
    this.path = `${configFolder}/${defaultFilename}`;
    this.publicKeyField = 'user_public_key';
    this.privateKeyField = 'user_private_key';
    this.addressField = 'user_address';
    this.registryField = 'registry';
    this.orbsAddressField = 'orbs_address';
    this.virtualChainIdField = 'virtual_chain_id';
    createGetterSetterFn(this);
  }

  readConfigByLines() {
    const content = fs.readFileSync(this.path, { encoding: 'utf8' });
    return content.split('\n');
  }

  exists() {
    return fs.existsSync(this.path);
  }

  create() {
    const defaultValues = [
      `${this.registryField}=${defaultRegisty}`,
      `${this.orbsAddressField}=${defaultOrbsNode}`,
      `${this.virtualChainIdField}=${defaultVirtualChainId}`,
    ].join('\n');
    fs.writeFileSync(this.path, defaultValues);
  }

  get(key) {
    const lines = this.readConfigByLines();
    const line = lines.find($ => $.startsWith(key));
    if (line) {
      return line.split('=')[1];
    }
    return null;
  }

  set(key, value) {
    const lines = this.readConfigByLines();
    const newLine = `${key}=${value}`;
    if (lines.findIndex($ => $.startsWith(key)) === -1) {
      lines.push(newLine);
    } else {
      const index = lines.find($ => $.startsWith(key));
      lines.splice(index, 1, newLine);
    }
    fs.writeFileSync(this.path, lines.join('\n'));
  }

  hasPublicKey() {
    return this.get(this.publicKeyField) !== null;
  }
}

module.exports = NpmrcService;
