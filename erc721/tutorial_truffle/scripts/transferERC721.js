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

async function transferERC721(_to, _tokenID) {
  console.log(await web3.eth.getGasPrice());
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      from: process.env.PUBLIC_KEY,
      to: contractAddress,
      gas: 1000000,
      gasPrice: await web3.eth.getGasPrice(),
      data: contract.methods
        .transferFrom(process.env.ALT_PUBLIC_KEY, _to, _tokenID.toString())
        .encodeABI(),
    },
    process.env.PRIVATE_KEY
  );

  console.log("signedTx >>", signedTx.rawTransaction);
  await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction.toString("hex"))
    .on("receipt", console.log);
}

transferERC721(process.env.ALT_PUBLIC_KEY, 0);
