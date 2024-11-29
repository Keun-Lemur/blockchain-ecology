const fs = require("fs");
const contractABI = JSON.parse(
  fs.readFileSync("./build/contracts/VendingMachine.json")
).abi;
const { Web3 } = require("web3");

//Result of truffle migrate
const contractAddress = "0xfBE5bFEe17bb682E6BEB3672cA62Fa4F87Cb80A6"; // contractAddress provided by truffle

//past way of connecting web3
// const web3 = new Web3(
//   new Web3.providers.HttpProvider("http://127.0.0.1:9545/")
// );

const web3 = new Web3("http://127.0.0.1:9545/");

const contract = new web3.eth.Contract(contractABI, contractAddress);

//-----------------------------Setting of interaction between abi and contract----------------------------------------------------------------

// getBalance function
async function getBalance(_address) {
  const balance = await contract.methods.cokeBalance(_address).call();
  console.log("coke balance >>", balance);
}

//-----------------------------Setting of function and call specific address----------------------------------------------------------------
getBalance("0x2b01b3cdbe6b145b9a19bed97d93d8c870d3291d");

//-----------------------------Execution of interaction between abi and contract by running script, getBalance function----------------------------------------------------------------
