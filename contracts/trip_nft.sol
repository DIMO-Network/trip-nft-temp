// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

import "./interfaces/IDIMORegistry.sol";
import "./interfaces/IDIMOVehicle.sol";

contract VehicleTrips is ERC1155 {
    /* ========== STATE VARIABLES ========== */
    struct Segment {
        uint256 start;
        uint256 end;
        string startHex;
        string endHext;
    }
    // vehicleNode => tripID => tripMetadata
    mapping(uint256 => mapping(uint256 => Segment)) public vehicleTripMetaData;

    mapping(address => uint256) public vehicleSegments;
    mapping(uint256 => string) customUri;
    uint256 public segmentsTotal;

    // owner => vehicleNode
    mapping(address => uint256) public deviceOwners;
    uint256 constant VEHICLE = 1;
    uint256 constant VEHICLE_SEGMENT = 2;

    event NewSegmentMinted(
        address indexed _owner,
        uint256 indexed vehicleNode,
        uint256 indexed segmentID,
        bytes data
    );

    constructor() ERC1155("") {}

    function initialize(string memory tokenUri_) external {
        _setURI(tokenUri_);
    }

    /**
     * @notice Mints a vehicle segment
     * @dev Caller must have the admin role
     * @param _owner The address of the vehicle node owner
     * @param vehicleNode vehicle token ID of device
     * @param segmentID ID if vehicle segment
     * @param _data        Data to pass if receiver is contract
     */
    function mintSegment(
        address _owner,
        uint256 vehicleNode,
        uint256 segmentID,
        bytes memory _data
    ) external {
        _mint(_owner, VEHICLE_SEGMENT, 1, _data);
        segmentsTotal++;
        vehicleSegments[_owner]++;
        emit NewSegmentMinted(_owner, vehicleNode, segmentID, _data);
    }
}
