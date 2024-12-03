/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { expect } from "chai";
// import chai from 'chai';
// import { solidity } from 'ethereum-waffle';
import { Contract, Signer } from "ethers";
import { ethers } from "hardhat";
import { Erc20Contract } from "../typechain-types";

// chai.use(solidity);

const name = "MyToken";
const symbol = "MTK";
const decimals = 18;

function changeToBigInt(amount: number) {
  const answerBigint = ethers.parseUnits(amount.toString(), decimals);
  return answerBigint;
}

describe("Start Example ERC20 test", async () => {
  // contracts
  let exampleERC20: Erc20Contract;
  //signers
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;
  let amount: number;

  it("Set data for exampleERC20 test", async () => {
    amount = 100;
    [owner, addr1, addr2] = await ethers.getSigners(); // get a test address
  });

  describe("Test Example ERC20 Metadata", () => {
    it("Should get correct name, symbol, decimal for the Example ERC20 Contract", async () => {
      const ExampleERC20Factory = await ethers.getContractFactory(
        "Erc20Contract"
      );

      const [initialOwner] = await ethers.getSigners();

      exampleERC20 = (await ExampleERC20Factory.deploy(
        initialOwner.address
      )) as Erc20Contract;
      expect(await exampleERC20.name()).to.equal(name);
      expect(await exampleERC20.symbol()).to.equal(symbol);
      expect(await exampleERC20.decimals()).to.equal(decimals);
    });
  });

  describe("Test Transfer exampleERC20", () => {
    it("Should get correct MetaData for the Example ERC20 Contract", async () => {
      await expect(
        exampleERC20.mint(addr1.getAddress(), changeToBigInt(amount))
      )
        .to.emit(exampleERC20, "Transfer")
        .withArgs(
          ethers.ZeroAddress,
          addr1.getAddress(),
          changeToBigInt(amount)
        );
      expect(await exampleERC20.totalSupply()).to.equal(changeToBigInt(amount));
      expect(await exampleERC20.balanceOf(addr1.getAddress())).to.equal(
        changeToBigInt(amount)
      );
    });
  });

  describe("Test Approval exampleERC20", () => {
    it("should get approved for the Example ERC20 Contract", async () => {
      await expect(
        exampleERC20
          .connect(addr1)
          .approve(addr2.getAddress(), changeToBigInt(amount))
      )
        .to.emit(exampleERC20, "Approval")
        .withArgs(
          addr1.getAddress(),
          addr2.getAddress(),
          changeToBigInt(amount)
        );
      expect(
        await exampleERC20.allowance(addr1.getAddress(), addr2.getAddress())
      ).to.equal(changeToBigInt(amount));
    });
  });

  describe("Test TransferFrom ExampleERC20", () => {
    it("Example ERC20 Contract should have erc20 token after TransferFrom", async () => {
      await expect(
        exampleERC20
          .connect(addr2)
          .transferFrom(
            addr1.getAddress(),
            owner.getAddress(),
            changeToBigInt(amount)
          )
      )
        .to.emit(exampleERC20, "Transfer")
        .withArgs(
          addr1.getAddress(),
          owner.getAddress(),
          changeToBigInt(amount)
        );
      expect(await exampleERC20.balanceOf(owner.getAddress())).to.equal(
        changeToBigInt(amount)
      );
    });
  });

  //   describe("Test burn exampleERC20", () => {
  //     it("Example ERC20 Contract should burn erc20 token clearly", async () => {
  //       await expect(exampleERC20.connect(owner).burn(changeToBigInt(amount)))
  //         .to.emit(exampleERC20, "Transfer")
  //         .withArgs(owner.address, ethers.ZeroAddress, changeToBigInt(amount));
  //       expect(await exampleERC20.balanceOf(owner.address)).to.equal(0);
  //     });
  //   });
});
