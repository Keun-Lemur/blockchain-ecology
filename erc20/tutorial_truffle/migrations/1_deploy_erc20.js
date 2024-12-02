const Erc20Contract = artifacts.require("Erc20Contract");

module.exports = async function (deployer, network, accounts) {
  // accounts[0]을 소유자로 지정
  const initialOwner = accounts[0];
  await deployer.deploy(Erc20Contract, initialOwner);
};
