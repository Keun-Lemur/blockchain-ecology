const myErc721 = artifacts.require("MyToken");

module.exports = async function (deployer, network, accounts) {
  const initialOwner = accounts[0];
  await deployer.deploy(myErc721, initialOwner);
};
