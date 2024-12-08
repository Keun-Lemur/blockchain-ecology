import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { MyERC721 } from "../typechain-types";

const name = "MyNFT";
const symbol = "MTK";
const tokenURI =
  "https://teal-working-trout-758.mypinata.cloud/ipfs/bafybeidqzou3yepjpotpeojtejasgv7w2jnngzwynngkr77lz5f2m5dvzu/1.png";

describe("Start Example ERC721 test", () => {
  let exampleERC721: MyERC721;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const ExampleERC721Factory = await ethers.getContractFactory("MyERC721");
    exampleERC721 = await ExampleERC721Factory.deploy(owner.address);
    await exampleERC721.waitForDeployment();
  });

  it("Check owner of the contract", async () => {
    const contractOwner = await exampleERC721.owner();
    console.log("Deployed contract owner:", contractOwner);
    console.log("Expected owner:", owner.address);
    expect(contractOwner).to.equal(owner.address);
  });

  describe("Test Example ERC721 Metadata", () => {
    it("Should get correct name and symbol for the Example ERC721 Contract", async () => {
      expect(await exampleERC721.name()).to.equal(name);
      expect(await exampleERC721.symbol()).to.equal(symbol);
    });
  });

  describe("Test Initial State", () => {
    it("Should have minted token 0 to owner during deployment", async () => {
      expect(await exampleERC721.ownerOf(0)).to.equal(owner.address);
      expect(await exampleERC721.tokenURI(0)).to.equal(tokenURI);
      expect(await exampleERC721.totalSupply()).to.equal(1);
    });
  });

  describe("Test Mint exampleERC721", () => {
    it("Should Mint correctly for the Example ERC721 Contract", async () => {
      const tokenId = 1; // 토큰 ID 1부터 시작
      const newURI =
        "https://teal-working-trout-758.mypinata.cloud/ipfs/bafybeidqzou3yepjpotpeojtejasgv7w2jnngzwynngkr77lz5f2m5dvzu/1.png";

      console.log("Current owner:", await exampleERC721.owner());
      console.log("Trying to mint from:", owner.address);

      await expect(exampleERC721.connect(owner).safeMint(addr1.address, newURI))
        .to.emit(exampleERC721, "Transfer")
        .withArgs(ethers.ZeroAddress, addr1.address, tokenId);

      expect(await exampleERC721.totalSupply()).to.equal(2);
      expect(await exampleERC721.balanceOf(addr1.address)).to.equal(1);
      expect(await exampleERC721.ownerOf(tokenId)).to.equal(addr1.address);
      expect(await exampleERC721.tokenURI(tokenId)).to.equal(newURI);
    });
  });

  describe("Test Approval exampleERC721", () => {
    beforeEach(async () => {
      // addr1에게 tokenId 1 발행
      await exampleERC721.connect(owner).safeMint(addr1.address, tokenURI);
    });
    it("should get approved for the Example ERC721 Contract", async () => {
      expect(await exampleERC721.connect(addr1).approve(addr2.address, "1"))
        .to.emit(exampleERC721, "Approval")
        .withArgs(addr1.address, addr2.address, "1");
      expect(await exampleERC721.getApproved("1")).to.equal(addr2.address);
    });
  });
});

//   describe("Test TransferFrom ExampleERC721", async () => {
//     it("Example ERC721 Contract should have erc721 token after TransferFrom", async () => {
//       expect(
//         await exampleERC721
//           .connect(addr2)
//           .transferFrom(addr1.address, owner.address, "1")
//       )
//         .to.emit(exampleERC721, "Transfer")
//         .withArgs(addr1.address, owner.address, "1");
//       expect(await exampleERC721.ownerOf(1)).to.equal(owner.address);
//     });
//   });
