import { ethers } from "hardhat";
const contractAddress = process.env.ERC721!;
const account = process.env.PUBLIC_KEY!;
import MyERC721ABI from "../artifacts/contracts/MyERC721.sol/MyERC721.json"; // ABI 파일 경로

async function getBalance(contractAddress: string, account: string) {
  console.log("contractAddress >>>", contractAddress);
  console.log("account >>>", account);
  console.log("getBalance from erc721 contract");
  // const Erc721 = await ethers.getContractFactory("MyERC721");

  // signer가 누구인지 확인 (소유자여야 함)
  const [signer] = await ethers.getSigners();
  console.log("Signer address:", signer.address);

  const erc721 = new ethers.Contract(contractAddress, MyERC721ABI.abi, signer);

  try {
    const balance = await erc721.balanceOf(account);
    console.log(`Balance of ${account} is ${balance}`);
  } catch (error) {
    console.error("Error for balance: ", error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
getBalance(contractAddress, account).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
