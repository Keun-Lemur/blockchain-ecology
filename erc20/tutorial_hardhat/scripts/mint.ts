import { ethers } from "hardhat";
import { Erc20Contract } from "../typechain-types";
const contractAddress = process.env.ERC20!;
async function mint(to: string, amount: number) {
  console.log("mint from ERC20 contract");
  const Erc20 = await ethers.getContractFactory("Erc20Contract");
  const erc20 = (await Erc20.attach(contractAddress)) as Erc20Contract;
  const mint = await erc20.mint(to, ethers.parseUnits(amount.toString(), 18));
  console.log("mint :", mint);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const amount = 10000;
mint(process.env.PUBLIC_KEY!, amount).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
