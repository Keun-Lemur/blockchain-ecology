import { ethers } from "hardhat";
import MyERC1155ABI from "../artifacts/contracts/MyERC1155.sol/MyERC1155.json";

const contractAddress = process.env.ERC1155!;
const account = process.env.PUBLIC_KEY!;

async function getBalance(contractAddress: string, id: string) {
  console.log("get token uri from erc1155 contract");

  const [signer] = await ethers.getSigners();
  console.log("Signer address:", signer.address);
  console.log("Account address:", account);

  const erc1155 = new ethers.Contract(
    contractAddress,
    MyERC1155ABI.abi,
    signer
  );

  try {
    if (!ethers.isAddress(contractAddress)) {
      throw new Error(`Invalid contract address: ${contractAddress}`);
    }

    const [signer] = await ethers.getSigners();
    console.log("Signer address:", signer.address);

    // Contract instance 생성 확인
    const erc1155 = new ethers.Contract(
      contractAddress,
      MyERC1155ABI.abi,
      signer
    );
    console.log("Contract instance created successfully");

    // ID를 BigInt로 변환
    const tokenId = BigInt(id);
    console.log(`Checking balance for token ID: ${tokenId}`);

    // Balance 확인
    const balance = await erc1155.balanceOf(signer.address, tokenId);
    console.log(`Balance for token ID ${tokenId}: ${balance.toString()}`);

    // URI 확인
    if (balance > 0n) {
      const uri = await erc1155.uri(tokenId);
      console.log(`URI for token ID ${tokenId}: ${uri}`);
    } else {
      console.log(`No tokens owned for ID ${tokenId}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Detailed error:", {
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
getBalance(contractAddress, "0").catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
