const erc20 = artifacts.require("Erc20Contract");
const truffleAssert = require("truffle-assertions");

contract("testERC20", async (accounts) => {
  const msgSender = accounts[0];
  const accountTwo = accounts[1];
  const accountThree = accounts[2];
  const sendAmount = web3.utils.toWei("1000", "ether");
  const approveAmount = web3.utils.toWei("1000", "ether");
  const burnAmount = web3.utils.toWei("1000", "ether");

  it("should transfer erc20 token correctly", async () => {
    const erc20Instance = await erc20.deployed();
    await erc20Instance.mint(msgSender, sendAmount); // 송금을 위한 민팅
    await erc20Instance.transfer(accountTwo, sendAmount);
    const accountTwoBalance = await erc20Instance.balanceOf(accountTwo);
    assert.equal(accountTwoBalance, sendAmount, " balance is not correct");
  });

  it("should approve right amount of erc20 token correctly", async () => {
    const erc20Instance = await erc20.deployed();
    await erc20Instance.approve(accountTwo, approveAmount);
    const approvedAmount = await erc20Instance.allowance(msgSender, accountTwo);
    assert.equal(approvedAmount, approveAmount, " allownace is not correct");
  });

  it("should send right transferFrom of erc20 token correctly", async () => {
    const erc20Instance = await erc20.deployed();
    await erc20Instance.mint(msgSender, sendAmount); // 송금을 위한 민팅
    await erc20Instance.transferFrom(msgSender, accountThree, approveAmount, {
      from: accountTwo,
    });
    const accountThreeBalance = await erc20Instance.balanceOf(accountThree);
    assert.equal(
      approveAmount,
      accountThreeBalance,
      "balanceOf is not correct"
    );
  });

  it("should revert when over burned", async () => {
    const erc20Instance = await erc20.deployed();
    const burnAmount = web3.utils.toWei("1", "ether");
    await truffleAssert.reverts(
      erc20Instance.burn(burnAmount),
      undefined // 메시지 검증 대신 성공 여부만 확인
    );
  });
});
