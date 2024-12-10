import { ethers } from "hardhat";

const contractAddress = process.env.ERC721!;

async function transferEvent() {
  const MyERC721 = await ethers.getContractFactory("MyERC721");
  const erc721 = await MyERC721.attach(contractAddress);

  // Transfer 이벤트의 signature를 수동으로 생성
  const transferTopic = ethers.id("Transfer(address,address,uint256)");
  // console.log("topic >>", topic)
  // console.log("contractAddress.toString() >>", contractAddress.toString())

  const filter = {
    address: contractAddress,
    fromBlock: 7197075,
    toBpclock: "latest",
    topics: [transferTopic],
  };
  const logs = await ethers.provider.getLogs(filter);
  //특정 이벤트만 필터링 하기 위한 로그 값
  console.log("logs >>>", logs);

  let abi = require("../artifacts/contracts/MyERC721.sol/MyERC721.json").abi;
  let iface = new ethers.Interface(abi);
  // //로그를 분석하기 위해서 abi를 가져옴
  logs.forEach((log) => {
    const parsedLog = iface.parseLog(log);

    console.log("Event Details:");
    console.log("From:", parsedLog?.args.from);
    console.log("To:", parsedLog?.args.to);
    console.log("Token ID:", parsedLog?.args.tokenId.toString());
    console.log("Value:", parsedLog?.args);
    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
transferEvent().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
