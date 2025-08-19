require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    holesky: {
      url: process.env.ALCHEMY_HOLESKY_URL || "",
      accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [],
      chainId: 17000,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
