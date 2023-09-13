const { expect } = require("chai");
const { ethers } = require("hardhat");
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

/**
 * npx hardhat test ./test/TripNft.js
 */
describe("TripNft Unit Tests", async function () {
  it("get name", async () => {
    const TripNft = await ethers.getContractFactory("TripNft");
    const [arbitraryUser] = await ethers.getSigners();
    const tripNft = await TripNft.deploy(arbitraryUser.address);

    const output = await tripNft.name();
    console.log("output: ", output);
  });
});
