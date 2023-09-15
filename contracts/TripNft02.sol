// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

// Store each trip segment as a separate NFT
// Vehicle node owner at time of mint is trip owner

struct SegmentInfo {
    address owner;
    uint256 vehicleNode;
    uint256 tokenId;
    string bundlrId;
    HexTime start;
    HexTime end;
}

struct HexTime {
    uint64 hexIndex;
    uint64 time;
}

contract TripNft02 is ERC721, Ownable2Step {
    mapping(uint256 tripTokenId => SegmentInfo tripDetails) public _segmentInfo;
    uint256 public tripTokenId;

    event SegmentMinted(
        uint256 indexed vehicleNode,
        uint256 indexed tokenId,
        address indexed owner,
        string bundlrId,
        uint64 startTime,
        uint64 endTime,
        uint64 startHex,
        uint64 endHex
    );

    constructor() ERC721("TripNft02", "TRIP") {
        _transferOwnership(msg.sender);
    }

    function mint(
        address to,
        uint256 vehicleNode,
        uint64 startTime,
        uint64 endTime,
        uint64 startHex,
        uint64 endHex,
        string calldata bundlrId
    ) public onlyOwner {
        tripTokenId++;
        _segmentInfo[tripTokenId] = SegmentInfo(
            to,
            vehicleNode,
            tripTokenId,
            bundlrId,
            HexTime(startHex, startTime),
            HexTime(endHex, endTime)
        );
        _mint(to, tripTokenId);
        emit SegmentMinted(
            vehicleNode,
            tripTokenId,
            to,
            bundlrId,
            startTime,
            endTime,
            startHex,
            endHex
        );
    }

    function getSegmentInfo(
        uint256 tripId
    ) public view returns (SegmentInfo memory info) {
        info = _segmentInfo[tripId];
    }
}
