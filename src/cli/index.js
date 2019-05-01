#!/usr/bin/env node
const program = require('commander');
const loginAction = require('./actions/login');

program
  .command('login')
  .description('login or create user')
  .action(() => {
    const pk = loginAction();
    console.log(`User is logged in with ${pk}`);
  });

program.parse(process.argv);
