const fs = require("fs");
const contractABI = JSON.parse(
  fs.readFileSync("./build/contracts/MyToken.json")
).abi;
var { Web3 } = require("web3");
require("dotenv").config();

//truffle migrate를 해서 나온 contract address
const contractAddress = process.env.ERC721;
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getTransferEvents(_from) {
  await contract
    .getPastEvents(
      "Transfer",
      {
        filter: { from: _from }, // Using an array means OR: e.g. 20 or 23
        fromBlock: 8878935,
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
        console.log("from : ", events[i].returnValues.from);
        console.log("to : ", events[i].returnValues.to);
        console.log("tokenID : ", events[i].returnValues.tokenId);
      }
    });
}

getTransferEvents(process.env.PUBLIC_KEY);
