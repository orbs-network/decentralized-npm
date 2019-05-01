const fs = require('fs');

const defaultFilename = '.npmrc';
const defaultRegisty = 'https://registry.npmjs.org';

class NpmrcService {
  constructor(configFolder = process.cwd()) {
    this.path = `${configFolder}/${defaultFilename}`;
  }

  readConfigByLines() {
    const content = fs.readFileSync(this.path, { encoding: 'utf8' });
    return content.split('\n');
  }

  exists() {
    return fs.existsSync(this.path);
  }

  create() {
    fs.writeFileSync(this.path, `registry=${defaultRegisty}`);
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
}

module.exports = NpmrcService;
