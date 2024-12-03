import { ethers } from "hardhat";
import { Erc20Contract } from "../typechain-types";
const contractAddress = process.env.ERC20!;

async function transferEvent() {
  const MyERC20 = await ethers.getContractFactory("Erc20Contract");
  const erc20 = await MyERC20.attach(contractAddress);

  // Transfer 이벤트의 signature를 수동으로 생성
  const transferTopic = ethers.id("Transfer(address,address,uint256)");

  const filter = {
    address: contractAddress,
    fromBlock: 7201362, // 조회 시작 블록
    toBlock: "latest", // 조회 종료 블록
    topics: [transferTopic], // Transfer 이벤트 필터
  };

  const logs = await ethers.provider.getLogs(filter);

  console.log("logs >>>", logs);

  // ABI 로드
  const abi =
    require("../artifacts/contracts/Erc20Contract.sol/Erc20Contract.json").abi;
  const iface = new ethers.Interface(abi);

  logs.forEach((log) => {
    const parsedLog = iface.parseLog(log);

    console.log("Event Details:");
    console.log("From:", parsedLog?.args.from);
    console.log("To:", parsedLog?.args.to);
    console.log("Value:", parsedLog?.args.value.toString());
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
transferEvent().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
