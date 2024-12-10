import { ethers } from "hardhat";

async function main() {
  console.log("Deploying MyERC1155 contract");
  const ERC1155 = await ethers.getContractFactory("MyERC1155");
  const [initialOwner] = await ethers.getSigners();
  const erc1155 = await ERC1155.deploy(initialOwner.address);

  const deployedAddress = await erc1155.getAddress(); // 함수 호출!
  console.log(`ERC1155 contract is deployed to: ${deployedAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
