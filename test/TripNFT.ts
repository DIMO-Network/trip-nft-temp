import { expect } from "chai";
import { ethers } from "hardhat";

interface SegmentData {
  start: number;
  end: number;
  startHex: string;
  endHex: string;
}

describe("trip_nft_contract", function () {
  it("need to break this up", async function () {
    const [owner, user] = await ethers.getSigners();
    const vehicleTrips = await ethers.deployContract("VehicleTrips");

    var data: SegmentData = { start: 10, end: 20, startHex: "a", endHex: "b" };
    let dataB = Buffer.from(JSON.stringify(data));

    await expect(vehicleTrips.mintSegment(user.address, 1, 1, dataB))
      .to.emit(vehicleTrips, `NewSegmentMinted`)
      .withArgs(user.address, 1, 1, dataB);
  });
});
