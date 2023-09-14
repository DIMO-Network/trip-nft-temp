const { expect } = require("chai");
const { ethers } = require("hardhat");

interface SegmentInfo {
  vehicleNode: number;
  owner: string;
  startHex: string;
  endHex: string;
  bundlrId: string;
  tripNum: number;
}

/**
 * npx hardhat test ./test/TripNft02.js
 */
describe("TripNft02 Unit Tests", async function () {
  it("get name", async () => {
    const TripNft02 = await ethers.getContractFactory("TripNft02");
    const tripNft02 = await TripNft02.deploy();

    const output = await tripNft02.name();
    console.log("output: ", output);
  });

  it("mint trip", async () => {
    const TripNft02 = await ethers.getContractFactory("TripNft02");
    const [user] = await ethers.getSigners();
    const tripNft02 = await TripNft02.deploy();

    const vehicleNode = 1;

    var data: SegmentInfo = {
      startHex: "8843a13687fffff",
      endHex: "8843a13687fffff",
      bundlrId: "randomStringBundlrId",
      owner: user.address,
      vehicleNode: vehicleNode,
      tripNum: 0,
    };

    await expect(
      tripNft02.mint(
        user.address,
        vehicleNode,
        data.startHex,
        data.endHex,
        data.bundlrId
      )
    )
      .to.emit(tripNft02, "SegmentMinted")
      .withArgs(
        vehicleNode,
        user.address,
        0,
        data.startHex,
        data.endHex,
        data.bundlrId
      );

    await expect(
      tripNft02.mint(
        user.address,
        vehicleNode,
        data.startHex,
        data.endHex,
        data.bundlrId
      )
    )
      .to.emit(tripNft02, "SegmentMinted")
      .withArgs(
        vehicleNode,
        user.address,
        1,
        data.startHex,
        data.endHex,
        data.bundlrId
      );

    const tripId = await tripNft02.tripTokenId();
    const segInfo = await tripNft02.getSegmentInfo(vehicleNode, tripId);
    console.log(segInfo);
  });
});
