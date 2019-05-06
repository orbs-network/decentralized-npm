# Decentralized NPM Registry

> POC of decentralized NPM that runs on blockchain

## Usage

### Locally
1. Launch gamma server: `npm run gamma:start`
2. Deploy contracts: `npm run gamma:deploy:owners`
3. Interact with the cli: `npm run cli -- <action>`

## Supported Actions

### Login
#### `npm run cli -- login`
Login creates a `.npmrc` with configuration or registry and user keys.

### Owner
> Owner commands allow to interact with the list of owners per package.

#### `npm run cli -- owner ls <packageName>`
Lists of all owners for corresponding `packageName`.

#### `npm run cli -- owner add <packageName> <userAddress>`
Adds the specified `userAddress` of a new user as an owner to the specified `packageName`.

If the package doesn't have an owner, the address of a current user will be added as a first owner. In case specified `userAddress` is different from current user address, it will be added as a second owner.

#### `npm run cli -- owner rm <packageName> <userAddress>`
Removes the specified `userAddress` from the list of owners of specified `packageName`
