// Main application code for Digital Treasure Hunt

// Contract ABI - This would normally be generated from your Solidity contract
// For demo purposes, we're including a simplified version based on the provided contract
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "clueId",
				"type": "uint256"
			}
		],
		"name": "ClueAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "clueId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "solver",
				"type": "address"
			}
		],
		"name": "ClueSolved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "enum DigitalTreasureHunt.HuntState",
				"name": "state",
				"type": "uint8"
			}
		],
		"name": "HuntStateChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "NFTAwarded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "finalTokenId",
				"type": "uint256"
			}
		],
		"name": "TreasureHuntCompleted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "achievementsEarned",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "clueURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "answer",
				"type": "string"
			}
		],
		"name": "addClue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "clues",
		"outputs": [
			{
				"internalType": "string",
				"name": "clueURI",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "answer",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "solver",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentClueId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentClueURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "clueId",
				"type": "uint256"
			}
		],
		"name": "hasAchievement",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "huntState",
		"outputs": [
			{
				"internalType": "enum DigitalTreasureHunt.HuntState",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "resetHunt",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startHunt",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "answer",
				"type": "string"
			}
		],
		"name": "submitAnswer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClues",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

// Contract address - Replace with your deployed contract address
const contractAddress = "0x01D7678257D96280F6c882484ee8037bb79E6af7"; // REPLACE WITH ACTUAL ADDRESS

// Global variables
let provider;
let signer;
let contract;
let currentAccount;
let isAdmin = false;

// DOM Elements
const connectWalletBtn = document.getElementById('connect-wallet');
const accountDisplay = document.getElementById('account-display');
const accountAddress = document.getElementById('account-address');
const accountBalance = document.getElementById('account-balance');
const statusIcon = document.getElementById('status-icon');
const statusText = document.getElementById('status-text');
const clueContent = document.getElementById('clue-content');
const answerForm = document.getElementById('answer-form');
const answerInput = document.getElementById('answer-input');
const submitAnswerBtn = document.getElementById('submit-answer');
const nftGallery = document.getElementById('nft-gallery');
const adminControls = document.getElementById('admin-controls');
const adminPanel = document.getElementById('admin-panel');
const startHuntBtn = document.getElementById('start-hunt');
const resetHuntBtn = document.getElementById('reset-hunt');
const addClueBtn = document.getElementById('add-clue');
const clueUriInput = document.getElementById('clue-uri');
const clueAnswerInput = document.getElementById('clue-answer');
const withdrawFundsBtn = document.getElementById('withdraw-funds');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const notificationClose = document.getElementById('notification-close');
const completionModal = document.getElementById('completion-modal');
const closeModalBtn = document.getElementById('close-modal');
const clueMarkers = document.getElementById('clue-markers');

// Hunt state enum from contract
const HuntState = {
    Inactive: 0,
    Active: 1,
    Completed: 2
};

// Initialize the application
async function initApp() {
    // Check if window.ethereum is available (MetaMask or similar)
    if (window.ethereum) {
        try {
            // Create provider and get network information
            provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            console.log(`Connected to ${network.name} (${network.chainId})`);
            
            // Setup event listeners for account changes
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', () => window.location.reload());
            
            // Initialize contract interface
            contract = new ethers.Contract(contractAddress, contractABI, provider);
            
            // Check if already connected
            const accounts = await provider.listAccounts();
            if (accounts.length > 0) {
                await handleAccountsChanged(accounts);
            }
            
            // Update the UI
            updateGameStatus();
        } catch (error) {
            console.error("Error initializing app:", error);
            showNotification("Failed to initialize application", "error");
        }
    } else {
        console.log("No Ethereum wallet detected");
        showNotification("No Ethereum wallet detected. Please install MetaMask.", "error");
    }
}

// Connect wallet button handler
async function connectWallet() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // The account change will be handled by the accountsChanged event
    } catch (error) {
        console.error("User denied account access:", error);
        showNotification("Wallet connection was denied", "error");
    }
}

// Handle account changes
async function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
        return;
    }
    
    // Get the new active account
    currentAccount = accounts[0];
    signer = provider.getSigner();
    
    // Update contract instance with signer
    contract = contract.connect(signer);
    
    // Check if user is admin (contract owner)
    const ownerAddress = await contract.owner();
    isAdmin = (currentAccount.toLowerCase() === ownerAddress.toLowerCase());
    
    // Update UI
    accountAddress.textContent = shortenAddress(currentAccount);
    const balanceWei = await provider.getBalance(currentAccount);
    const balanceEth = ethers.utils.formatEther(balanceWei);
    accountBalance.textContent = `${parseFloat(balanceEth).toFixed(4)} ETH`;
    
    // Show account display and hide connect button
    connectWalletBtn.classList.add('hidden');
    accountDisplay.classList.remove('hidden');
    
    // Show admin panel if user is admin
    if (isAdmin) {
        adminControls.classList.remove('hidden');
        adminPanel.classList.remove('hidden');
    } else {
        adminControls.classList.add('hidden');
        adminPanel.classList.add('hidden');
    }
    
    // Update the game state
    await updateGameStatus();
    await loadNFTs();
}

// Disconnect wallet (UI cleanup)
function disconnectWallet() {
    currentAccount = null;
    signer = null;
    
    // Update UI
    connectWalletBtn.classList.remove('hidden');
    accountDisplay.classList.add('hidden');
    answerForm.classList.add('hidden');
    adminControls.classList.add('hidden');
    adminPanel.classList.add('hidden');
    
    // Update clue content placeholder
    clueContent.innerHTML = '<p class="placeholder-text">Connect your wallet to see the current clue</p>';
    
    // Update NFT gallery placeholder
    nftGallery.innerHTML = '<p class="placeholder-text">Connect your wallet to see your achievements</p>';
}

// Update game status based on contract state
async function updateGameStatus() {
    if (!contract || !currentAccount) return;
    
    try {
        // Get current hunt state
        const stateValue = await contract.huntState();
        const totalClues = await contract.totalClues();
        
        // Update status display
        switch (parseInt(stateValue)) {
            case HuntState.Inactive:
                statusIcon.textContent = "🔒";
                statusText.textContent = "Hunt Inactive";
                
                if (isAdmin) {
                    startHuntBtn.disabled = totalClues.eq(0);
                    resetHuntBtn.disabled = true;
                }
                
                clueContent.innerHTML = '<p class="placeholder-text">The treasure hunt has not started yet</p>';
                answerForm.classList.add('hidden');
                break;
                
            case HuntState.Active:
                statusIcon.textContent = "🔍";
                statusText.textContent = "Hunt Active";
                
                if (isAdmin) {
                    startHuntBtn.disabled = true;
                    resetHuntBtn.disabled = false;
                }
                
                // Get current clue information
                await loadCurrentClue();
                break;
                
            case HuntState.Completed:
                statusIcon.textContent = "🏆";
                statusText.textContent = "Hunt Completed";
                
                if (isAdmin) {
                    startHuntBtn.disabled = true;
                    resetHuntBtn.disabled = false;
                }
                
                clueContent.innerHTML = '<p>The treasure hunt has been completed!</p>';
                answerForm.classList.add('hidden');
                break;
        }
        
        // Create clue markers on the map
        await createClueMarkers(totalClues);
        
    } catch (error) {
        console.error("Error updating game status:", error);
        showNotification("Failed to update game status", "error");
    }
}

// Load current clue information
async function loadCurrentClue() {
    try {
        // Get the current clue URI
        const clueURI = await contract.getCurrentClueURI();
        
        // In a real implementation, you would fetch the IPFS content
        // For demo purposes, we'll simulate the content
        const clueId = await contract.currentClueId();
        const dummyClueContent = `
            <h3>Clue #${clueId}</h3>
            <p>This is clue number ${clueId}. In a real implementation, this content would be fetched from IPFS using the URI: ${clueURI}</p>
            <p>Solve the puzzle to advance to the next clue!</p>
        `;
        
        clueContent.innerHTML = dummyClueContent;
        answerForm.classList.remove('hidden');
        
    } catch (error) {
        console.error("Error loading current clue:", error);
        clueContent.innerHTML = '<p class="placeholder-text">Error loading clue content</p>';
        answerForm.classList.add('hidden');
    }
}

// Create clue markers on the map
async function createClueMarkers(totalClues) {
    // Clear existing markers
    clueMarkers.innerHTML = '';
    
    if (!currentAccount) return;
    
    // Get current clue ID
    let currentClueId;
    try {
        const huntStateValue = await contract.huntState();
        currentClueId = huntStateValue == HuntState.Active ? await contract.currentClueId() : 0;
    } catch (error) {
        console.error("Error getting current clue:", error);
        return;
    }
    
    // Create markers for each clue
    for (let i = 1; i <= totalClues; i++) {
        // Generate random position (in a real app, these might be predetermined)
        const left = 10 + Math.random() * 80; // 10% to 90% of map width
        const top = 10 + Math.random() * 80;  // 10% to 90% of map height
        
        // Create marker element
        const marker = document.createElement('div');
        marker.className = 'clue-marker';
        marker.textContent = i;
        marker.style.left = `${left}%`;
        marker.style.top = `${top}%`;
        
        // Determine marker state (solved, active, or locked)
        let markerState = '';
        try {
            const isSolved = await contract.hasAchievement(currentAccount, i);
            if (isSolved) {
                markerState = 'solved';
            } else if (i === currentClueId) {
                markerState = 'active';
            }
        } catch (error) {
            console.error(`Error checking clue state for clue ${i}:`, error);
        }
        
        if (markerState) {
            marker.classList.add(markerState);
        }
        
        // Add marker to the map
        clueMarkers.appendChild(marker);
    }
}

// Load NFT achievements
async function loadNFTs() {
    if (!contract || !currentAccount) return;
    
    try {
        // Get total clues
        const totalClues = await contract.totalClues();
        
        // Clear the gallery
        nftGallery.innerHTML = '';
        
        // Check each achievement and add to gallery if earned
        let hasAnyNFT = false;
        for (let i = 1; i <= totalClues; i++) {
            const hasAchievement = await contract.hasAchievement(currentAccount, i);
            
            if (hasAchievement) {
                hasAnyNFT = true;
                
                // Create NFT display element
                const nftItem = document.createElement('div');
                nftItem.className = 'nft-item';
                nftItem.textContent = '🏅';
                nftItem.setAttribute('data-clue', `Clue #${i}`);
                
                nftGallery.appendChild(nftItem);
            }
        }
        
        // Display placeholder if no NFTs
        if (!hasAnyNFT) {
            nftGallery.innerHTML = '<p class="placeholder-text">You haven\'t earned any achievements yet</p>';
        }
    } catch (error) {
        console.error("Error loading NFTs:", error);
        nftGallery.innerHTML = '<p class="placeholder-text">Error loading achievements</p>';
    }
}

// Submit answer to current clue
async function submitClueAnswer() {
    if (!contract || !currentAccount) return;
    
    const answer = answerInput.value.trim();
    if (!answer) {
        showNotification("Please enter an answer", "error");
        return;
    }
    
    try {
        // Disable submit button during transaction
        submitAnswerBtn.disabled = true;
        
        // Submit the answer to the contract
        const tx = await contract.submitAnswer(answer);
        showNotification("Submitting answer...", "info");
        
        // Wait for transaction to complete
        await tx.wait();
        
        // Clear input field
        answerInput.value = '';
        
        // Show success notification
        showNotification("Answer correct! Moving to next clue.", "success");
        
        // Check if hunt completed
        const huntState = await contract.huntState();
        if (huntState == HuntState.Completed) {
            // Show completion modal
            completionModal.classList.remove('hidden');
        }
        
        // Update game status
        await updateGameStatus();
        await loadNFTs();
    } catch (error) {
        console.error("Error submitting answer:", error);
        
        // Check for specific error messages
        if (error.message.includes("Incorrect answer")) {
            showNotification("Incorrect answer. Try again!", "error");
        } else {
            showNotification("Error submitting answer", "error");
        }
    } finally {
        // Re-enable submit button
        submitAnswerBtn.disabled = false;
    }
}

// Admin function: Add new clue
async function addNewClue() {
    if (!contract || !isAdmin) return;
    
    const clueURI = clueUriInput.value.trim();
    const clueAnswer = clueAnswerInput.value.trim();
    
    if (!clueURI || !clueAnswer) {
        showNotification("Please enter both clue URI and answer", "error");
        return;
    }
    
    try {
        // Disable button during transaction
        addClueBtn.disabled = true;
        
        // Add clue to contract
        const tx = await contract.addClue(clueURI, clueAnswer);
        showNotification("Adding new clue...", "info");
        
        // Wait for transaction to complete
        await tx.wait();
        
        // Clear input fields
        clueUriInput.value = '';
        clueAnswerInput.value = '';
        
        // Show success notification
        showNotification("New clue added successfully", "success");
        
        // Update game status
        await updateGameStatus();
    } catch (error) {
        console.error("Error adding clue:", error);
        showNotification("Error adding new clue", "error");
    } finally {
        // Re-enable button
        addClueBtn.disabled = false;
    }
}

// Admin function: Start hunt
async function startTreasureHunt() {
    if (!contract || !isAdmin) return;
    
    try {
        // Disable button during transaction
        startHuntBtn.disabled = true;
        
        // Start the hunt
        const tx = await contract.startHunt();
        showNotification("Starting treasure hunt...", "info");
        
        // Wait for transaction to complete
        await tx.wait();
        
        // Show success notification
        showNotification("Treasure hunt started successfully", "success");
        
        // Update game status
        await updateGameStatus();
    } catch (error) {
        console.error("Error starting hunt:", error);
        showNotification("Error starting treasure hunt", "error");
    } finally {
        // Re-enable button
        startHuntBtn.disabled = false;
    }
}

// Admin function: Reset hunt
async function resetTreasureHunt() {
    if (!contract || !isAdmin) return;
    
    try {
        // Disable button during transaction
        resetHuntBtn.disabled = true;
        
        // Reset the hunt
        const tx = await contract.resetHunt();
        showNotification("Resetting treasure hunt...", "info");
        
        // Wait for transaction to complete
        await tx.wait();
        
        // Show success notification
        showNotification("Treasure hunt reset successfully", "success");
        
        // Update game status
        await updateGameStatus();
    } catch (error) {
        console.error("Error resetting hunt:", error);
        showNotification("Error resetting treasure hunt", "error");
    } finally {
        // Re-enable button
        resetHuntBtn.disabled = false;
    }
}

// Admin function: Withdraw funds
async function withdrawFunds() {
    if (!contract || !isAdmin) return;
    
    try {
        // Disable button during transaction
        withdrawFundsBtn.disabled = true;
        
        // Withdraw funds
        const tx = await contract.withdraw();
        showNotification("Withdrawing funds...", "info");
        
        // Wait for transaction to complete
        await tx.wait();
        
        // Show success notification
        showNotification("Funds withdrawn successfully", "success");
    } catch (error) {
        console.error("Error withdrawing funds:", error);
        showNotification("Error withdrawing funds", "error");
    } finally {
        // Re-enable button
        withdrawFundsBtn.disabled = false;
    }
}

// Show notification
function showNotification(message, type = "info") {
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 5000);
}

// Helper function to shorten address
function shortenAddress(address) {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', initApp);
connectWalletBtn.addEventListener('click', connectWallet);
submitAnswerBtn.addEventListener('click', submitClueAnswer);
addClueBtn.addEventListener('click', addNewClue);
startHuntBtn.addEventListener('click', startTreasureHunt);
resetHuntBtn.addEventListener('click', resetTreasureHunt);
withdrawFundsBtn.addEventListener('click', withdrawFunds);
notificationClose.addEventListener('click', () => notification.classList.add('hidden'));
closeModalBtn.addEventListener('click', () => completionModal.classList.add('hidden'));

// Handle enter key on answer input
answerInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitClueAnswer();
    }
});