# Sample Hardhat Project

To generate abi and go file from root:

solc --abi ./contracts/TripNft.sol -o build --include-path node_modules/ --base-path .
abigen --abi=./build/TripNft.abi --pkg tripNft --out=tripNft.go
solc --bin ./contracts/TripNft.sol -o build --include-path node_modules/ --base-path .
abigen --bin=./build/TripNft.bin --abi=./build/TripNft.abi --pkg=tripNft --out=tripNft.go

---

to deploy:
npx hardhat run --network localhost scripts/deploy.ts
