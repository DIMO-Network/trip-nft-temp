const { expect } = require("chai");
const { ethers } = require("hardhat");

interface SegmentInfo {
  vehicleNode: number;
  owner: string;
  bundlrId: string;
  tokenId: number;
  start: HexTime;
  end: HexTime;
}

interface HexTime {
  hexIndex: number;
  time: number;
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
    const tripTokenId = 1;

    var data: SegmentInfo = {
      bundlrId: "randomStringBundlrId",
      owner: user.address,
      vehicleNode: vehicleNode,
      tokenId: tripTokenId,
      start: {
        hexIndex: 854775808,
        time: 1694760002,
      },
      end: {
        hexIndex: 854775909,
        time: 1694760012,
      },
    };

    await expect(
      tripNft02.mint(
        data.owner,
        data.vehicleNode,
        data.start.time,
        data.end.time,
        data.start.hexIndex,
        data.end.hexIndex,
        data.bundlrId
      )
    )
      .to.emit(tripNft02, "SegmentMinted")
      .withArgs(
        data.vehicleNode,
        data.tokenId,
        data.owner,
        data.bundlrId,
        data.start.time,
        data.end.time,
        data.start.hexIndex,
        data.end.hexIndex
      );
  });
  it("stored trip info", async () => {
    const TripNft02 = await ethers.getContractFactory("TripNft02");
    const [user] = await ethers.getSigners();
    const tripNft02 = await TripNft02.deploy();

    const vehicleNode = 1;
    const tripTokenId = 1;

    var data: SegmentInfo = {
      bundlrId: "randomStringBundlrId",
      owner: user.address,
      vehicleNode: vehicleNode,
      tokenId: tripTokenId,
      start: {
        hexIndex: 854775808,
        time: 1694760002,
      },
      end: {
        hexIndex: 854775909,
        time: 1694760012,
      },
    };

    await expect(
      tripNft02.mint(
        data.owner,
        data.vehicleNode,
        data.start.time,
        data.end.time,
        data.start.hexIndex,
        data.end.hexIndex,
        data.bundlrId
      )
    )
      .to.emit(tripNft02, "SegmentMinted")
      .withArgs(
        data.vehicleNode,
        data.tokenId,
        data.owner,
        data.bundlrId,
        data.start.time,
        data.end.time,
        data.start.hexIndex,
        data.end.hexIndex
      );

    const tripId = await tripNft02.tripTokenId();
    const segInfo: SegmentInfo = await tripNft02.getSegmentInfo(tripId);

    expect(segInfo.vehicleNode).to.equal(data.vehicleNode);
    expect(segInfo.tokenId).to.equal(data.tokenId);
    expect(segInfo.owner).to.equal(data.owner);
    expect(segInfo.bundlrId).to.equal(data.bundlrId);
    expect(segInfo.start.time).to.equal(data.start.time);
    expect(segInfo.end.time).to.equal(data.end.time);
    expect(segInfo.start.hexIndex).to.equal(data.start.hexIndex);
    expect(segInfo.end.hexIndex).to.equal(data.end.hexIndex);
  });
});
