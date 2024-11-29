// This is a Hardhat test file to test 'vendning machine smart contract's functionality':  coke balance, purchase, restock.

//How smartcontract is working:
//1. After the contract is deployed, check whether it has 500 cokes or not.
//2. Can users purchase cokes with right amount of ether?
//3. Can owners restock cokes?

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"; //loadfixture is used for setup and snapshot state of the blockchain in every test
import { expect } from "chai"; // used for assertion
import { ethers } from "hardhat";

//1.
describe("Coke Vending Machine", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function VendingMachineFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const VendingMachine = await ethers.getContractFactory("VendingMachine");
    const vendingMachine = await VendingMachine.deploy();

    return { vendingMachine, owner, otherAccount };
  }

  describe("VendingMachine", function () {
    //2.
    it("should make 500 cokes at constructor", async function () {
      const { vendingMachine } = await loadFixture(VendingMachineFixture);
      expect(
        Number(await vendingMachine.cokeBalance(vendingMachine.getAddress()))
      ).to.equal(500);
    });

    it("should send coke correctly after purchase", async function () {
      const { vendingMachine, owner, otherAccount } = await loadFixture(
        VendingMachineFixture
      );
      console.log(
        "vendingMachine cokeBalance",
        await vendingMachine.cokeBalance(vendingMachine.getAddress())
      );

      const accountTwoStartingBalance = Number(
        await vendingMachine.cokeBalance(otherAccount.getAddress())
      );
      console.log("accountTwoStartingBalance >>", accountTwoStartingBalance);

      const amount = 10;
      const payment = ethers.parseEther((amount * 2).toString());
      await expect(
        vendingMachine.connect(otherAccount).purchase(amount, {
          value: payment,
        })
      )
        .to.emit(vendingMachine, "Purchase")
        .withArgs(otherAccount.getAddress(), amount);

      const accountTwoEndingBalance = Number(
        await vendingMachine.cokeBalance(otherAccount.getAddress())
      );
      console.log("accountTwoEndingBalance >>", accountTwoEndingBalance);
      console.log(
        "vendingMachine cokeBalance",
        await vendingMachine.cokeBalance(vendingMachine.getAddress())
      );
      expect(accountTwoEndingBalance).to.equal(
        accountTwoStartingBalance + amount
      );
    });

    //3.
    it("should restock cokes correctly", async function () {
      const { vendingMachine, owner, otherAccount } = await loadFixture(
        VendingMachineFixture
      );

      const initialBalance = Number(
        await vendingMachine.cokeBalance(vendingMachine.getAddress())
      );

      console.log(
        "vendingMachine cokeBalance",
        await vendingMachine.cokeBalance(vendingMachine.getAddress())
      );

      const amount: number = 10;
      await vendingMachine.connect(owner).restock(amount);
      const finalBalance = Number(
        await vendingMachine.cokeBalance(vendingMachine.getAddress())
      );

      expect(finalBalance).to.equal(initialBalance + amount);
    });
  });
});
