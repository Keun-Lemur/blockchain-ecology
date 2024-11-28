const VendingMachine = artifacts.require("VendingMachine");

contract("VendingMachine", function (accounts) {
  const accountOne = accounts[0];
  const accountTwo = accounts[1];

  // Check balance in the vending machine
  it("should have 500 cokes at constructor", async () => {
    const vendingMachineInstance = await VendingMachine.deployed();
    const balance = await vendingMachineInstance.cokeBalance.call(
      vendingMachineInstance.address
    );
    assert.equal(
      balance.toNumber(),
      500, // starting balance in the vendingmachin should be 500
      "Vending machine should have 100 cokes at start"
    );
  });

  // Users purchase coke from vending machine
  it("should buy cokes correctly", async () => {
    const vendingMachineInstance = await VendingMachine.deployed();

    // starting balance
    const accountTwoStartingBalance = (
      await vendingMachineInstance.cokeBalance.call(accountTwo)
    ).toNumber();

    const amount = 5; // Will pruchase
    const pricePerCoke = 2; // 2 ether per coke
    const totalValue = web3.utils.toWei(
      (pricePerCoke * amount).toString(),
      "ether"
    );

    // purchase transaction from accountTwo
    await vendingMachineInstance.purchase(amount, {
      from: accountTwo,
      value: totalValue,
    });

    // balance after purchase
    const accountTwoEndingBalance = (
      await vendingMachineInstance.cokeBalance.call(accountTwo)
    ).toNumber();

    assert.equal(
      accountTwoEndingBalance,
      accountTwoStartingBalance + amount,
      "Users didn't buy cokes correctly"
    );
  });

  it("should restock cokes correctly", async () => {
    const vendingMachineInstance = await VendingMachine.deployed();
    const vendingMahcineStartingBalance = (
      await vendingMachineInstance.cokeBalance.call(
        vendingMachineInstance.address
      )
    ).toNumber();
    console.log("vendingMahcineStartingBalance", vendingMahcineStartingBalance);
    const amount = 5;
    await vendingMachineInstance.restock(amount);

    const vendingMahcineEndingBalance = (
      await vendingMachineInstance.cokeBalance.call(
        vendingMachineInstance.address
      )
    ).toNumber();
    console.log("vendingMahcineEndingBalance", vendingMahcineEndingBalance);

    assert.equal(
      vendingMahcineEndingBalance,
      vendingMahcineStartingBalance + amount,
      "Coke wasn't restocked correctly"
    );
  });
});
