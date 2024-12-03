import { ethers } from "hardhat";

async function main() {
  console.log("Deploying ERC20 contract");

  // Get the contract factory for the ERC20 contract
  const ERC20 = await ethers.getContractFactory("Erc20Contract");

  // Get the initial signer (deploying account)
  const [initialOwner] = await ethers.getSigners();

  // Deploy the contract with initialOwner as a constructor argument
  const erc20 = await ERC20.deploy(initialOwner.address);

  // Await and log the contract address
  console.log(`ERC20 contract is deployed to: ${await erc20.getAddress()}`);
}

// Use async/await to handle errors and ensure smooth deployment
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
