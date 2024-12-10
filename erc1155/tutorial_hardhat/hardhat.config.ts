import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
require("dotenv").config();

const config: HardhatUserConfig = {
  networks: {
    local: {
      url: "http://127.0.0.1:8545/",
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
    },
    ethsepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY!, process.env.ALT_PRIVATE_KEY!],
    },
  },
  solidity: "0.8.22",
};

export default config;
