const ERC721 = artifacts.require("ERC721Contract");
const BN = web3.utils.BN;

contract("ERC721Contract", (accounts) => {
  const msgSender = accounts[0];
  const accountTwo = accounts[1];
  tokenId = 0;

  it("should mint 1 nft at constructor", async () => {
    const erc721Instance = await ERC721.deployed();
    const balance = await erc721Instance.balanceOf.call(msgSender);
    assert.equal(
      balance,
      web3.utils.toWei("1", "ether"),
      "should mint 1 nft at constructor"
    );
  });

  it("should transfer erc721 token correctly", async () => {
    const erc721Instance = await ERC721.deployed();
    const ownerOfNFT = await erc721Instance.ownerOf(tokenId.toString());
    console.log(`ownerOfNFT is ${ownerOfNFT}`);

    await erc721Instance.transferFrom(
      msgSender,
      accountTwo,
      tokenId.toString()
    );

    const ownerOfNFTAfter = await erc721Instance.ownerOf(tokenId.toString());
    console.log(`ownerOfNFTAfter is ${ownerOfNFTAfter}`);
    assert.equal(ownerOfNFTAfter, accountTwo, " owner is not correct");
  });
});
