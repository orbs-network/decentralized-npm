#!/usr/bin/env node
const program = require('commander');
const { Client, NetworkType } = require('orbs-client-sdk');
const NpmrcService = require('./services/npmrc');
const OwnershipService = require('./services/ownership');
const loginActionFactory = require('./actions/login');
const ownerActionsFactory = require('./actions/owner');

const npmrc = new NpmrcService();

if (!npmrc.exists()) {
  npmrc.create();
}

const orbsClient = new Client(
  npmrc.getOrbsAddress(),
  npmrc.getVirtualChainId(),
  NetworkType.NETWORK_TYPE_TEST_NET,
);

const ownership = new OwnershipService(orbsClient);

program
  .command('login')
  .description('login or create user')
  .action(() => {
    const loginAction = loginActionFactory(npmrc);
    const pk = loginAction();
    console.log(`User is logged in with ${pk}`);
  });

program
  .command('owner <action> [pkg] [publicKey]')
  .description('manage package owners')
  .action((action, pkg, publicKey) => {
    const ownerActions = ownerActionsFactory(npmrc, ownership);
    switch (action) {
      case 'ls':
        ownerActions.list(pkg);
        break;
      case 'add':
        ownerActions.add(pkg, publicKey);
        break;
      case 'rm':
        ownerActions.remove(pkg, publicKey);
        break;
      default:
        throw new Error('unrecognized owner action');
    }
  });

program.parse(process.argv);
