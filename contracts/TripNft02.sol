// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

// Store each trip segment as a separate NFT
// Vehicle node owner at time of mint is trip owner

struct SegmentInfo {
    uint256 vehicleNode;
    address owner;
    uint256 startHex;
    uint256 endHex;
    uint256 startTime;
    uint256 endTime;
    string bundlrId;
    uint256 tripNum;
}

contract TripNft02 is ERC721, Ownable2Step {
    mapping(uint256 tripTokenId => SegmentInfo tripDetails) public _segmentInfo;
    uint256 public tripTokenId;

    event SegmentMinted(
        uint256 indexed vehicleNode,
        address indexed owner,
        string indexed bundlrId,
        uint256 startHex,
        uint256 endHex,
        uint256 startTime,
        uint256 endTime
    );

    constructor() ERC721("TripNft02", "TRIP") {
        _transferOwnership(msg.sender);
    }

    function mint(
        address to,
        uint256 vehicleNode,
        uint256 startHex,
        uint256 endHex,
        uint256 startTime,
        uint256 endTime,
        string calldata bundlrID
    ) public onlyOwner {
        tripTokenId++;
        _segmentInfo[tripTokenId] = SegmentInfo(
            vehicleNode,
            to,
            startHex,
            endHex,
            startTime,
            endTime,
            bundlrID,
            tripTokenId
        );
        _mint(to, tripTokenId);
        emit SegmentMinted(
            vehicleNode,
            to,
            bundlrID,
            startHex,
            endHex,
            startTime,
            endTime
        );
    }

    function getSegmentInfo(
        uint256 tripId
    ) public view returns (SegmentInfo memory info) {
        info = _segmentInfo[tripId];
    }
}
