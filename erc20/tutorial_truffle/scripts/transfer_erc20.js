const fs = require("fs");
const { Web3 } = require("web3");
require("dotenv").config();

// Contract 정보
const contractABI = JSON.parse(
  fs.readFileSync("./build/contracts/Erc20Contract.json")
).abi;
const contractAddress = process.env.ERC20;
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function transferERC20(_to, _value) {
  try {
    // 가스 가격과 가스 한도 설정
    const gasPrice = await web3.eth.getGasPrice();
    const fromAddress = process.env.PUBLIC_KEY;

    // 잔고 확인
    const tokenBalance = await contract.methods.balanceOf(fromAddress).call();
    console.log(
      `Token Balance of sender: ${web3.utils.fromWei(
        tokenBalance,
        "ether"
      )} Tokens`
    );

    // 소수점 이하를 BigInt로 처리
    const amountInWei = web3.utils.toWei(_value.toString(), "ether");
    console.log(`Amount to transfer: ${amountInWei} Wei`);

    // 잔고가 충분한지 확인
    if (BigInt(tokenBalance) < BigInt(amountInWei)) {
      throw new Error("Insufficient token balance");
    }

    // 가스 한도 추정
    const gasLimit = await contract.methods
      .transfer(_to, amountInWei)
      .estimateGas({ from: process.env.PUBLIC_KEY });

    // 가스 한도는 Number 타입으로, BigInt와 혼합하지 않도록 처리
    const gasLimitBigInt = BigInt(gasLimit);
    console.log(`Estimated Gas Limit: ${gasLimitBigInt}`);

    // 트랜잭션 생성 및 서명
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        from: fromAddress,
        to: contractAddress,
        gas: gasLimitBigInt + 10000n, // 여유 가스를 BigInt로 처리
        gasPrice: BigInt(gasPrice), // gasPrice를 BigInt로 처리
        data: contract.methods.transfer(_to, amountInWei).encodeABI(),
      },
      process.env.PRIVATE_KEY
    );

    console.log("Signed Transaction: ", signedTx.rawTransaction);

    // 트랜잭션 전송
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("Transaction Receipt: ", receipt);
  } catch (error) {
    console.error("Error during transfer:", error.message);
  }
}

// 실행
const recipient = process.env.TEST_PUBLIC_KEY; // 수신자 주소
const amount = "0.00000000000000003"; // 전송 금액 (현재 잔고만큼)
transferERC20(recipient, amount);
