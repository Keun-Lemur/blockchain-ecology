import { ethers } from "hardhat";
import MyErc1155ABI from "../artifacts/contracts/MyERC1155.sol/MyERC1155.json";

const contractAddress = process.env.ERC1155!;
async function mint(to: string, id: Array<number>, amount: Array<number>) {
  console.log("Mint from erc1155 contract");

  const [signer] = await ethers.getSigners();
  console.log("Signer address:", signer.address);

  const erc1155 = new ethers.Contract(
    contractAddress,
    MyErc1155ABI.abi,
    signer
  );

  try {
    const mint = await erc1155.mintBatch(to, id, amount, "0x");
    console.log("mint :", mint);
  } catch (error) {
    console.error("Error for mint: ", error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const ids = [0, 1, 2];
const amounts = [10, 11, 12];
mint(process.env.PUBLIC_KEY!, ids, amounts).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
