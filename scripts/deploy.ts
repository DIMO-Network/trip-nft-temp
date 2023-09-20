import { ethers } from "hardhat";

async function main() {
  const TripNft = await ethers.getContractFactory("TripNft");
  const contract = await TripNft.deploy();
  console.log("TripNft deployed to: ", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
