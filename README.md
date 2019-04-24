# Decentralized NPM Registry

## Getting started


## Local development
1. Install `npmrc`: `npm install -g npmrc`
1. Create `local` profile that will point to local registry
    ```bash
    npmrc -c local
    npm config set registry http://localhost:4567
    ```
    To switch back simply run `npmrc default`