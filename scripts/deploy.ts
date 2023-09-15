import { ethers } from "hardhat";

async function main() {
  const TripNft = await ethers.getContractFactory("TripNft");
  await TripNft.deploy();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
