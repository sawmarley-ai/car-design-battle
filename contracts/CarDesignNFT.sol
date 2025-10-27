// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarDesignNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(uint256 => string) public tokenURIs;

    constructor() ERC721("CarDesignNFT", "CDES") {}

    function mint(address to, string memory tokenURI) external onlyOwner returns (uint256) {
        uint256 id = nextTokenId++;
        _safeMint(to, id);
        tokenURIs[id] = tokenURI;
        return id;
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        return tokenURIs[id];
    }
}
