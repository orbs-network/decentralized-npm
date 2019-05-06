const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

const GAMMA_PORT = 8080;
const GAMMA_SERVER = 'localhost';

class GammaDriver {
  constructor(server = GAMMA_SERVER, port = GAMMA_PORT, experimental = true) {
    this.server = server;
    this.port = port;
    this.experimental = experimental;
    this.config = require('../orbs-test-keys.json');
  }

  async start() {
    try {
      const { stdout, stderr } = await execFile('gamma-cli', [
        'start-local',
        '-wait',
        '-env',
        'experimental',
        '-port',
        this.port,
      ]);
      console.log(stdout);
      if (stderr) {
        console.error(stderr);
      }
    } catch (e) {
      console.error('Unable to run start gamma-cli');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async deployContract(name, path) {
    try {
      const { stdout, stderr } = await execFile('gamma-cli', [
        'deploy',
        path,
        '-name',
        name,
        '-signer',
        'user1',
      ]);
      console.log(stdout);
      if (stderr) {
        console.error(stderr);
      }
    } catch (e) {
      console.error(`Unable to deploy contract ${name}`);
    }
  }

  async stop() {
    try {
      const { stdout, stderr } = await execFile('gamma-cli', [
        'stop-local',
        'experimental',
        '-port',
        this.port,
      ]);
      console.log(stdout);
      if (stderr) {
        console.error(stderr);
      }
    } catch (e) {
      console.error('Unable to run stop gamma-cli');
    }
  }

  getEndpoint() {
    return `http://${this.server}:${this.port}`;
  }

  getUserConfig(userId) {
    return this.config[userId];
  }
}

module.exports = GammaDriver;
