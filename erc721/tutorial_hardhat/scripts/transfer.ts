import { ethers } from "hardhat";
const contractAddress = process.env.ERC721!;
import MyERC721ABI from "../artifacts/contracts/MyERC721.sol/MyERC721.json";
async function transfer(from: string, to: string, tokenId: number) {
  console.log("transfer from ER721 contract");

  const [signer] = await ethers.getSigners();
  console.log("Signer address:", signer.address);
  const er721 = new ethers.Contract(contractAddress, MyERC721ABI.abi, signer);

  try {
    const transfer = await er721.transferFrom(from, to, tokenId.toString());
    console.log("transfer :", transfer);
  } catch (error) {
    console.error("Error for balance: ", error);
  }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const tokenId = 1;
transfer(process.env.PUBLIC_KEY!, process.env.TEST_PUBLIC_KEY!, tokenId).catch(
  (error) => {
    console.error(error);
    process.exitCode = 1;
  }
);
