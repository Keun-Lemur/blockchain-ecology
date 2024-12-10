import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";

import { Contract } from "ethers";
import { ethers } from "hardhat";

const tokenURI =
  "https://teal-working-trout-758.mypinata.cloud/ipfs/bafybeidqzou3yepjpotpeojtejasgv7w2jnngzwynngkr77lz5f2m5dvzu/1.png";

describe("Start Example ERC721 Scenario test", async () => {
  let exampleERC721: Contract;
  //signers
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  async function ERC721Fixture() {
    // contracts
    // Contracts are deployed using the first signer/account by default
    // 배포가 매번 되어있을 것이라고 가정하고 시작.
    [owner, addr1, addr2] = await ethers.getSigners(); // get a test address

    const Erc721 = await ethers.getContractFactory("MyERC721");
    const exampleERC721 = await Erc721.deploy(owner.address);

    return { exampleERC721, owner, addr1, addr2 };
  }

  it("Should get transfer correctly for the Example ERC721 Contract", async () => {
    const { exampleERC721, owner, addr1, addr2 } = await loadFixture(
      ERC721Fixture
    );
    await exampleERC721.safeMint(addr1.address, tokenURI);
    expect(await exampleERC721.ownerOf(1)).to.equal(addr1.address);
  });

  it("Example ERC721 Contract should burn and mint erc721 token clearly", async () => {
    const { exampleERC721, owner, addr1, addr2 } = await loadFixture(
      ERC721Fixture
    );
    await exampleERC721.safeMint(owner.address, tokenURI);
    expect(await exampleERC721.ownerOf(1)).to.equal(owner.address);
    await exampleERC721.burn(1);
    await exampleERC721.burn(0);
    await exampleERC721.safeMint(addr1.address, tokenURI);
    expect(await exampleERC721.ownerOf(2)).to.equal(addr1.address);
  });

  it("Example ERC721 Contract should burn and mint erc721 token clearly 2", async () => {
    const { exampleERC721, owner, addr1, addr2 } = await loadFixture(
      ERC721Fixture
    );
    await exampleERC721.safeMint(addr1.address, tokenURI);
    expect(await exampleERC721.ownerOf(1)).to.equal(addr1.address);
    await exampleERC721.connect(addr1).burn(1);
    await exampleERC721.burn(0);
    await exampleERC721.safeMint(addr2.address, tokenURI);
    expect(await exampleERC721.ownerOf(2)).to.equal(addr2.address);
  });
});
