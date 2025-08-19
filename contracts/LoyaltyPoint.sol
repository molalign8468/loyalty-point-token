// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoyaltyPoint is ERC20, Ownable {
   constructor(uint256 initialSupply, address initialOwner) ERC20("LoyaltyPoint", "LP") Ownable(initialOwner){
          _mint(initialOwner, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
    _mint(to, amount * 10 ** decimals());
    }
}