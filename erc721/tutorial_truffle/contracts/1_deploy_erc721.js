const myErc721 = artifacts.require("ERC721Contract");

module.exports = function (deployer) {
  deployer.deploy("myErc721");
};
