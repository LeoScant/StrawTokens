//SPDX-License-Identifier: MIT
//Deployed @https://testnets.opensea.io/collection/unidentified-contract-72157
//Deploy2 https://sepolia.etherscan.io/address/0x29a720e931c72e9b14ebd28faf1f7e80321694dd#code

pragma solidity 0.8.21;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract StrawTokens is ERC1155Supply, Ownable {
    string public name = "Straw Hat Collection";
    string public symbol = "STRAW";
    uint256 private constant Rufy = 1;
    uint256 private constant Zoro = 2;
    uint256 private constant Nami = 3;
    uint256 private constant Sanji = 4;
    string private constant baseUri = "https://brown-pregnant-alpaca-857.mypinata.cloud/ipfs/QmZoyc753vLdk3sgHrA6ph2Ny2C43P96JTPGAjEaVoNqSv/";

    mapping(uint256 => string) private _uris;

    error InvalidTokenId(uint256 tokenId);

    constructor()
        ERC1155(
            "https://brown-pregnant-alpaca-857.mypinata.cloud/ipfs/QmZoyc753vLdk3sgHrA6ph2Ny2C43P96JTPGAjEaVoNqSv/{id}.json"
        )
    {
        _mint(msg.sender, Rufy, 1, "");
        _mint(msg.sender, Zoro, 5, "");
        _mint(msg.sender, Nami, 15, "");
        _mint(msg.sender, Sanji, 5, "");
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _uris[tokenId];
    }

    function setTokenUri(
        uint256 tokenId,
        string memory tokenUri
    ) public onlyOwner {
        require(bytes(_uris[tokenId]).length == 0, "Cannot set uri twice");
        _uris[tokenId] = tokenUri;
    }

    function baseTokenURI() public pure returns (string memory) {
        return baseUri;
    }

    function tokenURI(uint256 _tokenId) public pure returns (string memory) {
        if(_tokenId > 10) revert InvalidTokenId(_tokenId);
        return string.concat(baseTokenURI(), Strings.toString(_tokenId), ".json");
    }
}
