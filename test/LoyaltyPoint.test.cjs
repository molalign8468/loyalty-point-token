const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LoyaltyPoint Contract", function () {
  let LoyaltyPoint;
  let loyaltyPoint;
  let owner;
  let addr1;
  let addr2;
  let initialSupply;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    initialSupply = 1000000;
    LoyaltyPoint = await ethers.getContractFactory("LoyaltyPoint");
    loyaltyPoint = await LoyaltyPoint.deploy(initialSupply, owner.address);
    await loyaltyPoint.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await loyaltyPoint.owner()).to.equal(owner.address);
    });

    it("Should have the correct name and symbol", async function () {
      expect(await loyaltyPoint.name()).to.equal("LoyaltyPoint");
      expect(await loyaltyPoint.symbol()).to.equal("LP");
    });

    it("Should assign the initial supply to the owner", async function () {
      const expectedTotalSupply = ethers.parseUnits(
        initialSupply.toString(),
        18
      );
      const ownerBalance = await loyaltyPoint.balanceOf(owner.address);

      expect(await loyaltyPoint.totalSupply()).to.equal(expectedTotalSupply);
      expect(ownerBalance).to.equal(expectedTotalSupply);
    });
  });

  describe("Minting", function () {
    it("Should allow the owner to mint tokens to a new address", async function () {
      const mintAmount = 500; // Correct: Use a simple number
      const initialTotalSupply = await loyaltyPoint.totalSupply();
      const initialBalance = await loyaltyPoint.balanceOf(addr1.address);

      // Mint tokens as the owner
      await loyaltyPoint.mint(addr1.address, mintAmount);

      const newTotalSupply = await loyaltyPoint.totalSupply();
      const newBalance = await loyaltyPoint.balanceOf(addr1.address);

      const mintAmountInWei = ethers.parseUnits(mintAmount.toString(), 18);

      // Check balances and total supply
      expect(newBalance).to.equal(initialBalance + mintAmountInWei);
      expect(newTotalSupply).to.equal(initialTotalSupply + mintAmountInWei);
    });

    it("Should NOT allow a non-owner to mint tokens", async function () {
      const mintAmount = 100;

      // Attempt to mint from a non-owner address (addr1)
      await expect(
        loyaltyPoint.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.revertedWithCustomError(
        LoyaltyPoint,
        "OwnableUnauthorizedAccount"
      );
    });
  });

  describe("Token Properties", function () {
    it("Should have 18 decimals", async function () {
      expect(await loyaltyPoint.decimals()).to.equal(18);
    });
  });
});
