const ownerActionsFactory = (npmrc, ownership) => ({
  list() {},

  async add(pkg, key) {
    const currUserKey = npmrc.getPublicKey();
    if (!npmrc.hasPublicKey()) {
      throw new Error('User should login before. Do `npm login` first.');
    }
    const isTaken = await ownership.hasOwner(pkg);
    if (!isTaken) {
      await ownership.addOwner(pkg, currUserKey);
    }
    const isOwner = await ownership.isOwner(pkg, currUserKey);
    if (!isOwner) {
      throw new Error('Only owner can add other owners');
    }
    await ownership.addOwner(pkg, key);
  },

  remove() {},
});

module.exports = ownerActionsFactory;
