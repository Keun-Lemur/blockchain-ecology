import { ethers } from "hardhat";
const contractAddress = process.env.ERC1155!;
const account = process.env.PUBLIC_KEY!;

import MyERC1155ABI from "../artifacts/contracts/MyERC1155.sol/MyERC1155.json";

async function getBalance(
  contractAddress: string,
  account: string,
  id: string
) {
  const [signer] = await ethers.getSigners();
  console.log("Signer address:", signer.address);
  console.log("Account address:", account);

  console.log("getBalance from erc1155 contract");

  const erc1155 = new ethers.Contract(
    contractAddress,
    MyERC1155ABI.abi,
    signer
  );

  const balance = await erc1155.balanceOf(account, id);
  console.log(`NFT id ${id} : Balance of ${account} is ${balance}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
getBalance(contractAddress, account, "1").catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
