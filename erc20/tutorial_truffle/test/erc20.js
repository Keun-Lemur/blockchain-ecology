const erc20 = artifacts.require("Erc20Contract");
const bigNumber = require("bn.js");

contract("ERC20", (accounts) => {
  const msgSender = accounts[0];
  const accountTwo = accounts[1];

  it("should mint 1 ether at constructor", async () => {
    const erc20Instance = await erc20.deployed();
    const balance = await erc20Instance.balanceOf.call(msgSender);
    assert.equal(
      balance,
      web3.utils.toWei("1", "ether"),
      "should mint 1 ether at constructor"
    );
  });

  it("should transfer erc20 token correctly", async () => {
    const erc20Instance = await erc20.deployed();

    const initialBalanceMsgSender = await erc20Instance.balanceOf(msgSender);
    console.log(`initialBalanceMsgSender is ${initialBalanceMsgSender}`);

    const initialBalanceTwo = await erc20Instance.balanceOf(accountTwo);
    console.log(`initialBalanceTwo is ${initialBalanceTwo}`);

    await erc20Instance.transfer(accountTwo, web3.utils.toWei("0.5", "ether"));

    const endBalanceMsgSender = await erc20Instance.balanceOf(msgSender);
    console.log(`endBalanceMsgSender is ${endBalanceMsgSender}`);

    const endBalanceTwo = await erc20Instance.balanceOf(accountTwo);
    console.log(`endBalanceTwo is ${endBalanceTwo}`);

    assert.notEqual(
      endBalanceMsgSender,
      endBalanceTwo,
      "balance is not correct"
    );
  });

  it("should burn erc20 token correctly", async () => {
    const erc20Instance = await erc20.deployed();
    const initialBalanceTwo = await erc20Instance.balanceOf(accountTwo);
    console.log(`initialBalanceTwo is ${initialBalanceTwo}`);
    await erc20Instance.burn(web3.utils.toWei("0.5", "ether"), {
      from: accountTwo,
    });
    const endBalanceMsgSender = await erc20Instance.balanceOf(msgSender);
    console.log(`endBalanceMsgSender is ${endBalanceMsgSender}`);
    const endBalanceTwo = await erc20Instance.balanceOf(accountTwo);
    console.log(`endBalanceTwo is ${endBalanceTwo}`);
    assert.equal(endBalanceTwo, "0", " balance is not correct");
  });
});
