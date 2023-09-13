// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "solmate/src/tokens/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

// ERC-1155 will store segment information in the following way
// mapping(address => mapping(uint256 => uint256)) public balanceOf;
// the implementation below makes the following assumption about how our data maps to this storage
// mapping(vehicleOwnerAddress => mapping(vehicleNodeId => numberOfSegments))

interface INft {
    function tokenURI(uint256 tokenId) external view returns (string memory);

    function ownerOf(uint256 tokenId) external view returns (address);
}

contract TripNft is ERC1155, Ownable2Step {
    string public name;

    mapping(uint256 => string) private _idToUri;

    INft public vehicleIdProxy;
    address vehicleIdProxyAddr;

    constructor(address vehicleIdProxyAddress) {
        name = "TripNft";
        require(
            vehicleIdProxyAddress != address(0),
            "vehicleNftAddress is an invalid zero address"
        );
        _transferOwnership(msg.sender);
        vehicleIdProxyAddr = vehicleIdProxyAddress;
        vehicleIdProxy = INft(vehicleIdProxyAddr);
    }

    function uri(uint256 id) public view override returns (string memory uri_) {
        uri_ = vehicleIdProxy.tokenURI(id);
    }

    /**
     * TODO: do we want to bulk mint trips for cost savings?
     * @dev Mint a new trip NFT
     * @param to address to mint to
     * @param vehicleNode vehicle node to mint for
     */
    function mint(address to, uint256 vehicleNode) public onlyOwner {
        require(
            vehicleIdProxy.ownerOf(vehicleNode) == to,
            "TripNft: invalid owner"
        );

        _mint(to, vehicleNode, 1, "");
    }
}
