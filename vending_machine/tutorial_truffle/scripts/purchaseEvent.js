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

// getPurchaseEvents  function
// Records of purchase by purchasers.
async function getPurchaseEvents(_from) {
  await contract
    .getPastEvents(
      "Purchase",
      {
        filter: { purchaser: _from }, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
        toBlock: "latest",
      },
      function (error, events) {
        console.log(events);
      }
    )
    .then(function (events) {
      console.log("all events >>", events); // same results as the optional callback above
      for (i in events) {
        console.log("i >>", i);
        console.log("blockNumber : ", events[i].blockNumber);
        console.log("blockHash : ", events[i].blockHash);
        console.log("purchaser : ", events[i].returnValues.purchaser);
        console.log("amount : ", events[i].returnValues.amount);
      }
    });
}

getPurchaseEvents("0x2b01b3cdbe6b145b9a19bed97d93d8c870d3291d");
