# Decentralized NPM Registry

> POC of decentralized NPM that runs on blockchain

## Usage

### Locally
1. Launch gamma server: `npm run gamma:start`
2. Deploy contracts: `npm run gamma:deploy:owners`
3. Interact with the cli: `npm run cli -- <action>`

## Supported Actions

Below is the list of supported actions. It specifies primary and secondary actions with parameters, if applicable.

E.g. `npm run cli -- owner add react 0x123456779101213141`

|Primary Action|Secondary Action|Description|
|--------------|----------------|-----------|
|`login`||Login creates a `.npmrc` with configuration or registry and user keys.|
|`owner`||Owner commands allow to interact with the list of owners per package.|
||`ls <packageName>`|Lists of all owners for corresponding `packageName`.|
||`add <packageName> <userAddress>`|Adds the specified `userAddress` of a new user as an owner to the specified `packageName`|
||`rm <packageName> <userAddress>`|Removes the specified `userAddress` from the list of owners of specified `packageName`|

## Testing
### Unit tests `npm test`
It runs all tests using jest including integration tests with gamma server.

**Notice!** Tests that are using gamma, due to its performace of start/stop of docker, are currently stateful, meaning that if you are changing the state of a contract, it persists to other tests in a suite.

### Coverage `npm run test:coverage`
It will run tests and generate coverage report.

## License
MIT.
