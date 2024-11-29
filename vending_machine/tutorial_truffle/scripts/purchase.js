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

//purchase function
async function purchase(_from, _value) {
  await contract.methods
    .purchase(1)
    .send({ from: _from, value: _value })
    .on("transactionHash", function (hash) {
      console.log("tx hash >>", hash);
    })
    .on("receipt", function (receipt) {
      console.log("tx receipt >>", receipt);
    })
    .on("error", console.error);
}

//-----------------------------Setting of function and call specific address----------------------------------------------------------------
purchase("0x2b01b3cdbe6b145b9a19bed97d93d8c870d3291d", 20 * 10 ** 18);

//-----------------------------Execution of interaction between abi and contract by running script, getBalance function----------------------------------------------------------------
