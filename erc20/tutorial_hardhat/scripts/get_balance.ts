import { ethers } from "hardhat";
import { Erc20Contract } from "../typechain-types";
const contractAddress = process.env.ERC20!;
const account = process.env.PUBLIC_KEY!;

async function getBalance(contractAddress: string, account: string) {
  console.log(contractAddress);
  console.log(account);
  console.log("getBalance from erc20 contract");

  // ERC20 토큰 잔액 확인
  const Erc20 = await ethers.getContractFactory("Erc20Contract");
  const erc20 = (await Erc20.attach(contractAddress)) as Erc20Contract;
  const tokenBalance = await erc20.balanceOf(account);
  console.log(`Token Balance of ${account} is ${tokenBalance}`);
  console.log(
    `Token Balance of ${account} is ${ethers.formatUnits(
      tokenBalance.toString(),
      18
    )}`
  );

  // Ethereum (ETH) 잔액 확인
  const ethBalance = await ethers.provider.getBalance(account);
  console.log(`ETH Balance of ${account} is ${ethBalance}`);
  console.log(
    `ETH Balance of ${account} is ${ethers.formatEther(ethBalance)} ETH`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
getBalance(contractAddress, account).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
