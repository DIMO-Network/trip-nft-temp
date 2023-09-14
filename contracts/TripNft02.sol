// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

// Store each trip segment as a separate NFT
// Vehicle node owner at time of mint is trip owner
// For each vehicle node, new trip ids are the resulting of incrementing total trip count by 1
// mapping(uint256 vehicleNodeId => uint256 tripCount) public _vehicleNodeToTripCount;
// Trip details are associated with vehicle nodes as a mapping to array
// mapping(uint256 vehicleNodeId => SegmentInfo[] tripDetails)

struct SegmentInfo {
    uint256 vehicleNode;
    address owner;
    string startHex;
    string endHex;
    string bundlrId;
    uint256 tripNum;
}

contract TripNft02 is ERC721, Ownable2Step {
    mapping(uint256 vehicleNodeID => SegmentInfo[] tripDetails)
        public _vehicleNodeToTripDetails;
    mapping(uint256 vehicleNodeID => mapping(uint256 tripTokenId => uint256 detailIndex))
        private _vehicleNodeToTokenIdToDetailIndex;
    mapping(address owner => uint256 userTrips) public _userTripCount;
    uint256 public tripTokenId;

    event SegmentMinted(
        uint256 indexed vehicleNode,
        address indexed owner,
        uint256 indexed tripNum,
        string startHex,
        string endHex,
        string bundlrId
    );

    constructor() ERC721("TripNft02", "TRIP") {
        _transferOwnership(msg.sender);
    }

    function mint(
        address to,
        uint256 vehicleNode,
        string calldata startHex,
        string calldata endHex,
        string calldata bundlrID
    ) public onlyOwner {
        tripTokenId++;
        uint256 l = _vehicleNodeToTripDetails[vehicleNode].length;
        SegmentInfo memory s = SegmentInfo(
            vehicleNode,
            to,
            startHex,
            endHex,
            bundlrID,
            l
        );
        _vehicleNodeToTripDetails[vehicleNode].push(s);
        _vehicleNodeToTokenIdToDetailIndex[vehicleNode][tripTokenId] = l;
        _userTripCount[to]++;
        _mint(to, tripTokenId);
        emit SegmentMinted(vehicleNode, to, l, startHex, endHex, bundlrID);
    }

    function getSegmentInfo(
        uint256 vehicleNode,
        uint256 tripId
    ) public view returns (SegmentInfo memory info) {
        uint256 idx = _vehicleNodeToTokenIdToDetailIndex[vehicleNode][tripId];
        info = _vehicleNodeToTripDetails[vehicleNode][idx];
    }

    function userTripCount(address owner) public view returns (uint256 count) {
        count = _userTripCount[owner];
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
