import { ethers } from "hardhat";
import { VendingMachine } from "../typechain-types";
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

async function getBalance(contractAddress: string, account: string) {
  console.log("getBalance from vendingMachine contract");

  // Attach to the existing contract at the specified address
  const VendingMachine = await ethers.getContractFactory("VendingMachine");
  const vendingMachine = (await VendingMachine.attach(
    contractAddress
  )) as VendingMachine;

  // Call the cokeBalance method directly with the account address
  const balance = await vendingMachine.cokeBalance(account);
  console.log("cokeBalance:", balance);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
getBalance(contractAddress, account).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
