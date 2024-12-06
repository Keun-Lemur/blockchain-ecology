require("dotenv").config();
const { Web3 } = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC_URL_ALCHEMY)
);

const fs = require("fs");
const contractABI = JSON.parse(
  fs.readFileSync("./build/contracts/MyToken.json")
).abi;

const contractAddress = process.env.ERC721;
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function balanceOf(_account) {
  const balance = await contract.methods.balanceOf(_account).call();
  console.log(`Balance of ${_account} is ${balance}`);
}

balanceOf(process.env.ALT_PUBLIC_KEY);
