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

const ownership = new OwnershipService(orbsClient, npmrc);

program
  .command('login')
  .description('login or create user')
  .action(async () => {
    const loginAction = await loginActionFactory(npmrc);
    const address = loginAction();
    console.log(`User is logged in with ${address}`);
  });

program
  .command('owner <action> <pkg> [address]')
  .description('manage package owners')
  .action(async (action, pkg, address) => {
    const ownerActions = ownerActionsFactory(ownership);
    switch (action) {
      case 'ls':
        // eslint-disable-next-line no-case-declarations
        const list = await ownerActions.list(pkg);
        console.log(list);
        break;
      case 'add':
        await ownerActions.add(pkg, address);
        console.log(`User with ${address} has been added`);
        break;
      case 'rm':
        ownerActions.remove(pkg, address);
        break;
      default:
        throw new Error('unrecognized owner action');
    }
  });

program.parse(process.argv);
