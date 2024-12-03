require("dotenv").config();
const { Web3 } = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));

const fs = require("fs");
const contractABI = JSON.parse(
  fs.readFileSync("./build/contracts/Erc20Contract.json")
).abi;

const contractAddress = process.env.ERC20;
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function balanceOf(_account) {
  const balance = await contract.methods.balanceOf(_account).call();
  console.log(`Balance of ${_account} is ${balance}`);

  // const decimal = await contract.methods.decimals().call();
  // const formattedBalance = BigInt(balance) / BigInt(10 ** decimal);

  // console.log(`Formatted Balance of ${_account}: ${formattedBalance} Tokens`);

  console.log(
    `Balance of ${_account} is ${web3.utils.fromWei(balance, "ether")}`
  );

  // ETH 잔고 확인
  const ethBalance = await web3.eth.getBalance(process.env.PUBLIC_KEY);
  console.log(`ETH Balance: ${web3.utils.fromWei(ethBalance, "ether")} ETH`);

  // ERC-20 토큰 잔고 확인
  const tokenBalance = await contract.methods
    .balanceOf(process.env.PUBLIC_KEY)
    .call();
  console.log(
    `Token Balance: ${web3.utils.fromWei(tokenBalance, "ether")} Tokens`
  );
}

async function getETHBalance(_account) {
  const balance = await web3.eth.getBalance(_account);
  console.log(
    `ETH Balance of ${_account}: ${web3.utils.fromWei(balance, "ether")} ETH`
  );
}

getETHBalance(process.env.PUBLIC_KEY);

balanceOf(process.env.PUBLIC_KEY);
