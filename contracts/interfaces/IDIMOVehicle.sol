//SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.13;

/// @title IDimoVehicle
/// @notice Interface of the DIMO Vehicle ERC-721 token
/// @dev DIMO Vehicle token repository https://github.com/DIMO-Network/dimo-identity
interface IDimoVehicle {
    function balanceOf(address owner) external view returns (uint256 balance);
}
