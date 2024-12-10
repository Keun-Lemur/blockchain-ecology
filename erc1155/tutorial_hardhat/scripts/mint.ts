import { ethers } from "hardhat";
import MyErc1155ABI from "../artifacts/contracts/MyERC1155.sol/MyERC1155.json";

const contractAddress = process.env.ERC1155!;
async function mint(to: string, id: number, amount: number) {
  console.log("Minting from erc1155 contract");

  const [signer] = await ethers.getSigners();
  console.log("Signer address:", signer.address);

  const erc1155 = new ethers.Contract(
    contractAddress,
    MyErc1155ABI.abi,
    signer
  );
  console.log("mint :", await mint);
  try {
    const tx = await erc1155.mint(to, id, amount, "0x");
    console.log("Transaction submitted:", tx.hash);

    // transaction compeleted waiting
    const receipt = await tx.wait();
    console.log("Minting completed in block: ", receipt.blockNumber);
  } catch (error) {
    console.error("Error for mint: ", error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const id = 1;
mint(process.env.PUBLIC_KEY!, id, 5).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
