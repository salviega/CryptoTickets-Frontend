
// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";


// contract crytoTickets is ERC721URIStorage {

//     using Counters for Counters.Counter;

//     address public admin;
//     uint public maxMints;
//     Counters.Counter private _tokenIds;

//     constructor(address _admin,string memory _name,string memory _symbol,uint _maxMints) ERC721(_name,_symbol) {
//         maxMints = _maxMints;
//         admin = _admin;
//     }

//     modifier onlyAdmin(){
//         require(msg.sender == admin,"crytoTickets: forbidden");
//         _;
//     }

//     function mint(address _user, string memory tokenURI) external  returns (uint256){
//         uint256 newItemId = _tokenIds.current();
//         require(newItemId < maxMints,"crytoTickets: forbidden");
//         _mint(_user, newItemId);
//         _setTokenURI(newItemId, tokenURI);
//         _tokenIds.increment();
//         return newItemId;
//     }

//     function getReserves() external onlyAdmin {
//          payable(admin).transfer(balanceOf(address(this)));
//     }

//     function changeURL(string memory _url,uint _tokenId) external {
//         address _owner = ownerOf(_tokenId);
//         require(_owner == msg.sender,"crytoTickets: forbidden");
//         _setTokenURI(_tokenId,_url);
//     }


// }