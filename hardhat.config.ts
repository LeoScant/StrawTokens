import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    },
  },
  networks: {
    dashboard: {
      url: "http://localhost:24012/rpc",
    },
    sepolia: {
      url: `${process.env.ALCHEMY_SEPOLIA_URL}`,
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`],
    },
    mumbai: {
      chainId: 80001,
      url: `https://polgon-mumbai` //prendere da chainlist
    }
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`
  }
};

export default config;
