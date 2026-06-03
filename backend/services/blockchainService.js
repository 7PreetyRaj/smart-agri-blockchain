// Import ethers library
const { ethers } = require("ethers");

// Smart Contract Address
const CONTRACT_ADDRESS =
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Contract ABI
// Sirf wahi functions rakhe hain jo use karenge
const CONTRACT_ABI = [
    "function addRecord(uint256,uint256,uint256) public",
    "function getRecordCount() view returns(uint256)"
];

// Function to save data into blockchain
const saveToBlockchain = async (
    temperature,
    humidity,
    soilMoisture
) => {

    try {

        // Connect to local Hardhat blockchain
        const provider =
            new ethers.providers.JsonRpcProvider(
                "http://127.0.0.1:8545"
            );

        // First Hardhat account private key
        // Ye testing ke liye hai
        // First Hardhat account private key
        const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;

        const CONTRACT_ADDRESS =
           process.env.CONTRACT_ADDRESS;
           

        const wallet =
            new ethers.Wallet(
                privateKey,
                provider
            );

        // Smart Contract instance
        const contract =
            new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                wallet
            );

        // Send blockchain transaction
        const tx =
            await contract.addRecord(
                temperature,
                humidity,
                soilMoisture
            );

        // Wait until transaction mined
        await tx.wait();

        console.log(
            "Blockchain Transaction Success:",
            tx.hash
        );

        return tx.hash;

    } catch (error) {

        console.error(
            "Blockchain Error:",
            error.message
        );

        return null;
    }
};

module.exports = {
    saveToBlockchain
};