// const { expect } = require("chai");
// const { ethers } = require("hardhat");
// const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

/**
 * npx hardhat test ./test/TripNft01.ts
 */
describe("TripNft01 Unit Tests", async function () {
  it("get name", async () => {
    const TripNft01 = await ethers.getContractFactory("TripNft01");
    const [vehicleIDProxy] = await ethers.getSigners();
    const tripNft01 = await TripNft01.deploy(vehicleIDProxy.address);

    const output = await tripNft01.name();
    console.log("output: ", output);
  });

  it("get owner", async () => {
    const TripNft01 = await ethers.getContractFactory("TripNft01");
    const [vehicleIDProxy, vehicleOwner] = await ethers.getSigners();
    const tripNft01 = await TripNft01.deploy(vehicleIDProxy.address);

    const vehicleNode = 1;
    await expect(tripNft01.mint(vehicleOwner, vehicleNode))
      .to.emit(tripNft01, `SegmentMinted`)
      .withArgs(vehicleOwner.address, vehicleNode, 1);
  });
});
