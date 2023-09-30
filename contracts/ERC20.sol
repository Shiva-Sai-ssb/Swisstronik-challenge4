// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("My Token", "SSB") {}

    function mintTokens() public {
        _mint(msg.sender, 100 * 10 ** decimals());
    }

    function transferTokens(address _to) public returns (bool) {
        _transfer(msg.sender, _to, 10 * 10 ** decimals());
        return true;
    }
}
