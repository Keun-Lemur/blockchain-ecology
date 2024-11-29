import { ethers } from "hardhat";
import { VendingMachine } from "../typechain-types";
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function purchase(amount: number) {
  console.log("purchase​​ from vendingMachine contract");
  const VendingMachine = await ethers.getContractFactory("VendingMachine");
  const vendingMachine = (await VendingMachine.attach(
    contractAddress
  )) as VendingMachine;
  const purchase = await vendingMachine.purchase(amount, {
    value: (amount * 2 * 10 ** 18).toString(),
  });
  console.log("purchase :", purchase);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
purchase(10).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
