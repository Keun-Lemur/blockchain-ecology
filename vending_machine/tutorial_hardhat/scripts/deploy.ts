import { ethers } from "hardhat";

async function main() {
  console.log("deploying vendingMachine contract");
  const VendingMachine = await ethers.getContractFactory("VendingMachine");
  const vendingMachine = await VendingMachine.deploy();
  await vendingMachine.waitForDeployment(); // wait for deployment

  console.log(
    `vendingMachine contract is deployed to ${vendingMachine.target}` // deployed address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
