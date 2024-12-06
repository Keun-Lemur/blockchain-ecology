require("dotenv").config();
var { Web3 } = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));

const fs = require("fs");
const contractABI = JSON.parse(
  fs.readFileSync("./build/contracts/MyToken.json")
).abi;

//truffle migrate를 해서 나온 contract address
const contractAddress = process.env.ERC721;
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function mintERC721(_to) {
  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);
  const singedTx = await web3.eth.accounts.signTransaction(
    {
      from: process.env.PUBLIC_KEY,
      to: contractAddress,
      gasLimit: 2000000,
      gas: 1000000,
      gasPrice: await web3.eth.getGasPrice(),
      data: contract.methods.mint(_to).encodeABI(),
      data: contract.methods
        .safeMint(
          _to,
          "https://teal-working-trout-758.mypinata.cloud/ipfs/bafybeidqzou3yepjpotpeojtejasgv7w2jnngzwynngkr77lz5f2m5dvzu/1.png"
        )
        .encodeABI(),
    },
    process.env.PRIVATE_KEY
  );

  console.log("singedTx >>", singedTx.rawTransaction);
  await web3.eth
    .sendSignedTransaction(singedTx.rawTransaction.toString("hex"))
    .on("receipt", console.log);
}

mintERC721(process.env.ALT_PUBLIC_KEY);
