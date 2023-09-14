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
    const tripNum = 0;

    var data: SegmentInfo = {
      startHex: "8843a13687fffff",
      endHex: "8843a13687fffff",
      bundlrId: "randomStringBundlrId",
      owner: user.address,
      vehicleNode: vehicleNode,
      tripNum: tripNum,
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
        data.tripNum,
        data.startHex,
        data.endHex,
        data.bundlrId
      );
  });
  it("stored trip info", async () => {
    const TripNft02 = await ethers.getContractFactory("TripNft02");
    const [user] = await ethers.getSigners();
    const tripNft02 = await TripNft02.deploy();

    const vehicleNode = 1;
    const tripNum = 0;

    var data: SegmentInfo = {
      startHex: "8843a13687fffff",
      endHex: "8843a13687fffff",
      bundlrId: "randomStringBundlrId",
      owner: user.address,
      vehicleNode: vehicleNode,
      tripNum: tripNum,
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
        data.tripNum,
        data.startHex,
        data.endHex,
        data.bundlrId
      );

    const tripId = await tripNft02.tripTokenId();
    const segInfo: SegmentInfo = await tripNft02.getSegmentInfo(
      vehicleNode,
      tripId
    );

    expect(segInfo.vehicleNode).to.equal(data.vehicleNode);
    expect(segInfo.owner).to.equal(data.owner);
    expect(segInfo.tripNum).to.equal(data.tripNum);
    expect(segInfo.startHex).to.equal(data.startHex);
    expect(segInfo.endHex).to.equal(data.endHex);
    expect(segInfo.bundlrId).to.equal(data.bundlrId);
  });
});
