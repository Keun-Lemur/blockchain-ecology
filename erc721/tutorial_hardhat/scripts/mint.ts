import { ethers } from "hardhat";
import MyERC721ABI from "../artifacts/contracts/MyERC721.sol/MyERC721.json";

const contractAddress = process.env.ERC721!;
const tokenURI =
  "https://teal-working-trout-758.mypinata.cloud/ipfs/bafybeidqzou3yepjpotpeojtejasgv7w2jnngzwynngkr77lz5f2m5dvzu/1.png";
async function mint(to: string, tokenId: number) {
  console.log("Minting from ERC721 contract");

  const [signer] = await ethers.getSigners();
  console.log("Signer address:", signer.address);

  const erc721 = new ethers.Contract(contractAddress, MyERC721ABI.abi, signer);

  try {
    const tx = await erc721.safeMint(to, tokenURI);
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
const tokenId = 1;
mint(process.env.PUBLIC_KEY!, tokenId).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
