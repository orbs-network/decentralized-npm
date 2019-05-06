const ownerActionsFactory = ownership => ({
  list(pkg) {
    return ownership.getOwners(pkg);
  },

  add(pkg, address) {
    if (address === undefined) {
      throw new Error('Adding owner expect to receive an address');
    }
    return ownership.addOwner(pkg, address);
  },

  remove() {},
});

module.exports = ownerActionsFactory;
