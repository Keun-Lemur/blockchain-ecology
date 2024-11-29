import { ethers } from "hardhat";
import { VendingMachine } from "../typechain-types";

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function purchase(amount: number) {
  console.log("Fetching Purchase events...");

  // VendingMachine 컨트랙트 객체 생성
  const VendingMachine = await ethers.getContractFactory("VendingMachine");
  const vendingMachine = (await VendingMachine.attach(
    contractAddress
  )) as VendingMachine;

  // Purchase 이벤트 필터 생성
  const filter = vendingMachine.filters.Purchase();
  console.log("Filter created:", filter);

  // 이벤트 로그 가져오기
  const logs = await ethers.provider.getLogs({
    ...filter, // 필터를 직접 사용
    fromBlock: 0, // 필요한 블록 범위를 지정
    toBlock: "latest",
  });

  console.log(`Found ${logs.length} Purchase event(s)`);

  // ABI 로드
  const abi =
    require("../artifacts/contracts/vending_machine.sol/VendingMachine.json").abi;
  const iface = new ethers.Interface(abi);

  // 로그 분석
  for (const log of logs) {
    const parsedLog = iface.parseLog(log);

    // null 체크 추가
    if (parsedLog) {
      console.log("Purchaser:", parsedLog.args[0]); // 구매자 주소
      console.log("Amount:", parsedLog.args[1].toString()); // 구매 수량
    } else {
      console.warn("Parsed log is null. Skipping log:", log);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
purchase(10).catch((error) => {
  console.error("Error fetching events:", error);
  process.exitCode = 1;
});
