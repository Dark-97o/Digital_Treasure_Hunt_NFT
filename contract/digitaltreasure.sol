// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DigitalTreasureHunt
 * @dev Contract for managing a digital treasure hunt using NFTs without OpenZeppelin dependencies
 */
contract DigitalTreasureHunt {
    // Contract owner address
    address private _owner;
    
    // NFT details
    string private _name;
    string private _symbol;
    
    // Treasure hunt game state
    enum HuntState { Inactive, Active, Completed }
    HuntState public huntState;
    
    // Token counter
    uint256 private _tokenCounter;
    
    // Clue structure
    struct Clue {
        string clueURI;      // IPFS URI containing clue content
        string answer;       // Hashed answer to the clue
        bool isActive;       // Whether this clue is currently active
        address solver;      // Address of the person who solved this clue (if any)
    }
    
    // Mapping from clue ID to Clue struct
    mapping(uint256 => Clue) public clues;
    
    // Total number of clues in the hunt
    uint256 public totalClues;
    
    // Current active clue ID
    uint256 public currentClueId;
    
    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;
    
    // Mapping owner address to token count
    mapping(address => uint256) private _balances;
    
    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;
    
    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    
    // Mapping from token ID to token URI
    mapping(uint256 => string) private _tokenURIs;
    
    // Mapping to track which addresses have earned which achievement NFTs
    mapping(address => mapping(uint256 => bool)) public achievementsEarned;
    
    // Events
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event HuntStateChanged(HuntState state);
    event ClueAdded(uint256 clueId);
    event ClueSolved(uint256 clueId, address solver);
    event NFTAwarded(uint256 tokenId, address recipient);
    event TreasureHuntCompleted(address winner, uint256 finalTokenId);
    
    /**
     * @dev Constructor
     */
    constructor() {
        _name = "Digital Treasure Hunt";
        _symbol = "DTH";
        _owner = msg.sender;
        huntState = HuntState.Inactive;
        _tokenCounter = 0;
    }
    
    /**
     * @dev Modifier to check if caller is the contract owner
     */
    modifier onlyOwner() {
        require(msg.sender == _owner, "Not the contract owner");
        _;
    }
    
    /**
     * @dev Get token name
     */
    function name() public view returns (string memory) {
        return _name;
    }
    
    /**
     * @dev Get token symbol
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }
    
    /**
     * @dev Get the owner of the contract
     */
    function owner() public view returns (address) {
        return _owner;
    }
    
    /**
     * @dev Transfer ownership of the contract
     */
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        _owner = newOwner;
    }
    
    /**
     * @dev Get the owner of a specific token
     */
    function ownerOf(uint256 tokenId) public view returns (address) {
        address tokenOwner = _owners[tokenId];
        require(tokenOwner != address(0), "ERC721: Token does not exist");
        return tokenOwner;
    }
    
    /**
     * @dev Get the balance (number of tokens) of an address
     */
    function balanceOf(address tokenOwner) public view returns (uint256) {
        require(tokenOwner != address(0), "ERC721: Zero address cannot have tokens");
        return _balances[tokenOwner];
    }
    
    /**
     * @dev Get the approved address for a token
     */
    function getApproved(uint256 tokenId) public view returns (address) {
        require(_owners[tokenId] != address(0), "ERC721: Token does not exist");
        return _tokenApprovals[tokenId];
    }
    
    /**
     * @dev Check if an operator is approved for all by an owner
     */
    function isApprovedForAll(address tokenOwner, address operator) public view returns (bool) {
        return _operatorApprovals[tokenOwner][operator];
    }
    
    /**
     * @dev Set approval for a specific token
     */
    function approve(address to, uint256 tokenId) public {
        address tokenOwner = _owners[tokenId];
        require(to != tokenOwner, "ERC721: Approval to current owner");
        require(msg.sender == tokenOwner || isApprovedForAll(tokenOwner, msg.sender), 
                "ERC721: Not authorized to approve");
                
        _tokenApprovals[tokenId] = to;
        emit Approval(tokenOwner, to, tokenId);
    }
    
    /**
     * @dev Set approval for all tokens of sender to an operator
     */
    function setApprovalForAll(address operator, bool approved) public {
        require(operator != msg.sender, "ERC721: Approve to caller");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }
    
    /**
     * @dev Transfer a token from one address to another
     */
    function transferFrom(address from, address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: Transfer not authorized");
        _transfer(from, to, tokenId);
    }
    
    /**
     * @dev Safely transfer a token (simplified, without callback checking)
     */
    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId, "");
    }
    
    /**
     * @dev Safely transfer a token with data (simplified, without callback checking)
     */
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory /* data */) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: Transfer not authorized");
        _transfer(from, to, tokenId);
        // In a full implementation, this would check if the recipient is a contract and call onERC721Received
    }
    
    /**
     * @dev Check if an address is the owner or approved for a token
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address tokenOwner = _owners[tokenId];
        require(tokenOwner != address(0), "ERC721: Token does not exist");
        return (spender == tokenOwner || 
                getApproved(tokenId) == spender || 
                isApprovedForAll(tokenOwner, spender));
    }
    
    /**
     * @dev Internal function to transfer token ownership
     */
    function _transfer(address from, address to, uint256 tokenId) internal {
        require(_owners[tokenId] == from, "ERC721: Transfer from incorrect owner");
        require(to != address(0), "ERC721: Transfer to zero address");
        
        // Clear approvals
        _tokenApprovals[tokenId] = address(0);
        
        // Update balances
        _balances[from]--;
        _balances[to]++;
        
        // Update ownership
        _owners[tokenId] = to;
        
        emit Transfer(from, to, tokenId);
    }
    
    /**
     * @dev Mint a new token
     */
    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0), "ERC721: Mint to zero address");
        require(_owners[tokenId] == address(0), "ERC721: Token already exists");
        
        _balances[to]++;
        _owners[tokenId] = to;
        
        emit Transfer(address(0), to, tokenId);
    }
    
    /**
     * @dev Get token URI
     */
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "ERC721: Token does not exist");
        return _tokenURIs[tokenId];
    }
    
    /**
     * @dev Set token URI
     */
    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        require(_owners[tokenId] != address(0), "ERC721: Token does not exist");
        _tokenURIs[tokenId] = uri;
    }
    
    /**
     * @dev Start the treasure hunt
     */
    function startHunt() external onlyOwner {
        require(huntState == HuntState.Inactive, "Hunt already started");
        require(totalClues > 0, "No clues have been added");
        
        huntState = HuntState.Active;
        currentClueId = 1; // Start with the first clue
        emit HuntStateChanged(HuntState.Active);
    }
    
    /**
     * @dev Add a new clue to the treasure hunt
     * @param clueURI IPFS URI of clue content
     * @param answer Hashed answer to the clue
     */
    function addClue(string calldata clueURI, string calldata answer) external onlyOwner {
        require(huntState == HuntState.Inactive, "Cannot add clues while hunt is active");
        
        totalClues++;
        clues[totalClues] = Clue({
            clueURI: clueURI,
            answer: answer,
            isActive: false,
            solver: address(0)
        });
        
        emit ClueAdded(totalClues);
    }
    
    /**
     * @dev Get the current active clue URI
     * @return URI for the current clue or empty if no active clue
     */
    function getCurrentClueURI() external view returns (string memory) {
        require(huntState == HuntState.Active, "Hunt is not active");
        require(currentClueId <= totalClues, "No active clue");
        
        return clues[currentClueId].clueURI;
    }
    
    /**
     * @dev Helper function to convert uint to string
     */
    function toString(uint256 value) internal pure returns (string memory) {
        // Special case for 0
        if (value == 0) {
            return "0";
        }
        
        uint256 temp = value;
        uint256 digits;
        
        // Count number of digits
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        
        bytes memory buffer = new bytes(digits);
        
        // Fill buffer from right to left
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + value % 10));
            value /= 10;
        }
        
        return string(buffer);
    }
    
    /**
     * @dev Submit an answer for the current clue
     * @param answer The player's answer to the current clue
     */
    function submitAnswer(string calldata answer) external {
        require(huntState == HuntState.Active, "Hunt is not active");
        require(currentClueId <= totalClues, "No active clue");
        
        Clue storage currentClue = clues[currentClueId];
        require(currentClue.solver == address(0), "Clue already solved");
        
        // Check if the answer is correct
        require(keccak256(abi.encodePacked(answer)) == keccak256(abi.encodePacked(currentClue.answer)), 
                "Incorrect answer");
        
        // Mark clue as solved
        currentClue.solver = msg.sender;
        
        // Mint NFT achievement for solving this clue
        _mintAchievement(msg.sender, currentClueId);
        
        emit ClueSolved(currentClueId, msg.sender);
        
        // Move to next clue or complete the hunt
        if (currentClueId == totalClues) {
            // Last clue solved, treasure hunt completed
            huntState = HuntState.Completed;
            
            // Mint special completion NFT for the winner
            uint256 completionTokenId = _mintCompletionNFT(msg.sender);
            
            emit TreasureHuntCompleted(msg.sender, completionTokenId);
            emit HuntStateChanged(HuntState.Completed);
        } else {
            // Move to next clue
            currentClueId++;
        }
    }
    
    /**
     * @dev Mint an achievement NFT for solving a clue
     * @param recipient Address to receive the NFT
     * @param clueId ID of the clue that was solved
     */
    function _mintAchievement(address recipient, uint256 clueId) internal returns (uint256) {
        _tokenCounter++;
        uint256 newTokenId = _tokenCounter;
        
        _mint(recipient, newTokenId);
        
        // Set token URI (in production, would point to actual metadata)
        string memory metadataURI = string(abi.encodePacked(
            "ipfs://achievement/clue_", 
            toString(clueId)
        ));
        _setTokenURI(newTokenId, metadataURI);
        
        // Mark achievement as earned
        achievementsEarned[recipient][clueId] = true;
        
        emit NFTAwarded(newTokenId, recipient);
        
        return newTokenId;
    }
    
    /**
     * @dev Mint a special completion NFT for the winner
     * @param winner Address of the winner who completed the treasure hunt
     */
    function _mintCompletionNFT(address winner) internal returns (uint256) {
        _tokenCounter++;
        uint256 newTokenId = _tokenCounter;
        
        _mint(winner, newTokenId);
        
        // Set token URI for completion NFT
        string memory metadataURI = "ipfs://treasurehunt/completion";
        _setTokenURI(newTokenId, metadataURI);
        
        emit NFTAwarded(newTokenId, winner);
        
        return newTokenId;
    }
    
    /**
     * @dev Reset the hunt for a new round (only when currently inactive or completed)
     */
    function resetHunt() external onlyOwner {
        require(huntState != HuntState.Active, "Cannot reset an active hunt");
        
        // Reset hunt state
        huntState = HuntState.Inactive;
        currentClueId = 0;
        
        // Clear solvers from all clues but keep the clues themselves
        for (uint256 i = 1; i <= totalClues; i++) {
            clues[i].solver = address(0);
        }
        
        emit HuntStateChanged(HuntState.Inactive);
    }
    
    /**
     * @dev Check if a player has earned a specific achievement
     * @param player Address of the player
     * @param clueId ID of the clue/achievement to check
     */
    function hasAchievement(address player, uint256 clueId) external view returns (bool) {
        return achievementsEarned[player][clueId];
    }
    
    /**
     * @dev Allow contract owner to withdraw any ETH sent to the contract
     */
    function withdraw() external onlyOwner {
        (bool success, ) = payable(_owner).call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }
    
    /**
     * @dev Support receiving ETH
     */
    receive() external payable {}
}
