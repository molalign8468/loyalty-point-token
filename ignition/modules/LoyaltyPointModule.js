// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LoyaltyPointModule", (m) => {
  const initialOwner = m.getAccount(0);
  const initialSupply = ethers.parseEther("1000000");

  const LoyaltyPoint = m.contract("LoyaltyPoint", [
    initialSupply,
    initialOwner,
  ]);

  return { LoyaltyPoint };
});
