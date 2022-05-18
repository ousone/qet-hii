// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract QetHiiTest1 is ERC721, ERC721Enumerable, Pausable, Ownable {

    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIds;
    mapping (uint256 => string) private _tokenURIs;

    constructor() ERC721("Qet Hii Test 1", "Hi!") {}

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
    internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId) 
    public view virtual override
    returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        //string memory _baseURI = "data:application/json;base64,";
        string memory _tokenURI = _tokenURIs[tokenId];
        return(string(abi.encodePacked(_tokenURI)));
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    mapping (uint256 => string) private _bgColors;
    mapping (uint256 => string) private _fgColors;

    function _setColors(uint256 tokenId, string memory bgColor, string memory fgColor) 
    internal virtual {
        require(keccak256(bytes(bgColor)) != keccak256(bytes(fgColor)), "BG Color & Text Color cannot be the same.");
        uint256 i;
        uint256 j;
        // If this is the first id, no need to check
        if (tokenId == 1) {
            _bgColors[tokenId] = bgColor;
            _fgColors[tokenId] = fgColor;
        }
        else {
            for (i = 1; i < tokenId; i++) {
                // If bg not dup, set both bg fg
                if (keccak256(bytes(bgColor)) != keccak256(bytes(_bgColors[i]))) {
                    _bgColors[tokenId] = bgColor;
                    _fgColors[tokenId] = fgColor;
                }
                // If bg dup, check fg
                else {
                    for (j = 1; j < tokenId; j++) {
                        if (keccak256(bytes(fgColor)) != keccak256(bytes(_fgColors[j]))) {
                            _bgColors[tokenId] = bgColor;
                            _fgColors[tokenId] = fgColor;
                        }
                        else {
                            revert("This color pair already existed.");
                        }
                    }

                }          
            }
        }

    }

    function bgColorOf(uint256 tokenId) public view 
    returns(string memory) {
        return _bgColors[tokenId];
    }
    function fgColorOf(uint256 tokenId) public view 
    returns(string memory) {
        return _fgColors[tokenId];
    }

    uint256 public constant SUPPLYLIMIT = 10000;
    //mapping (uint256 => uint256) private _prices;

    /*
    // Production
    function _setPrice(uint256 tokenId) 
    internal virtual 
    returns(uint256) {
        // 0.5 ether = 500000000000000000
        uint256 basePrice = 0.5 ether;
        uint256 price;
        // 1-300
        if (tokenId >=1  && tokenId <= 300) {
            price == 0;
        }
        // 301 - 1000
        else if (tokenId >= 301 && tokenId <= 1000) {
            price = basePrice;
        }
        // 1001 - 3000 * 10
        else if (tokenId >= 1001 && tokenId <= 3000) {
            price = basePrice * 10;
        }
        // 3001 ... * 100
        else {
            price = basePrice * 100;
        }
        return price;
    }*/

    
    // Dev test 
    function _setPrice(uint256 tokenId) 
    internal virtual 
    returns(uint256) {
        // 0.5 ether = 50000000000000000
        uint256 basePrice = 0.05 ether;
        uint256 price;
        if (tokenId >=1 && tokenId <= 2) {
            price == 0;
        }
        else if (tokenId == 3) {
            price = basePrice;
        }
        else {
            price = basePrice * 10;
        }
        return price;
    }

    function mint(string memory uri, string memory bgColor, string memory fgColor)
    public payable
    returns (uint256) {
        require(totalSupply() < SUPPLYLIMIT, "Exceeds token supply.");

        _tokenIds.increment(); // Begin at Id #1 instead of #0
        uint256 newItemId = _tokenIds.current();

        // if owner, set price to 0
        if (msg.sender == owner()) {
            msg.value == 0;
        }
        // if minting price == 0, user can mint just 1 token
        else if (_setPrice(newItemId) == 0) {
            require(balanceOf(msg.sender) == 0, "Already have token(s).");
        }
        else {
            require(msg.value >= _setPrice(newItemId), "Not enough value sent; check price!");
        }
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, uri);
        _setColors(newItemId, bgColor, fgColor);
        return newItemId;
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Balance is 0");
        payable(owner()).transfer(address(this).balance);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}
