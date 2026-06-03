// Import ethers library
const { ethers } = require("ethers");



// Contract ABI
// Sirf wahi functions rakhe hain jo use karenge
const CONTRACT_ABI = [

    // Add new sensor record
    "function addRecord(uint256,uint256,uint256) public",

    // Total records stored
    "function getRecordCount() view returns(uint256)",

    // Read record by index
    "function getRecord(uint256) view returns(uint256,uint256,uint256,uint256)"
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
// Get total blockchain records
const getBlockchainRecordCount = async () => {

    try {

        const provider =
            new ethers.providers.JsonRpcProvider(
                "http://127.0.0.1:8545"
            );

        const contract =
            new ethers.Contract(
                process.env.CONTRACT_ADDRESS,
                CONTRACT_ABI,
                provider
            );

        const count =
            await contract.getRecordCount();

        return Number(count);

    } catch (error) {

        console.error(error.message);

        return 0;
    }
};


// Get all records from blockchain
const getAllBlockchainRecords = async () => {

    try {

        const provider =
            new ethers.providers.JsonRpcProvider(
                "http://127.0.0.1:8545"
            );

        const contract =
            new ethers.Contract(
                process.env.CONTRACT_ADDRESS,
                CONTRACT_ABI,
                provider
            );

        const count =
            await contract.getRecordCount();

        const records = [];

        for (let i = 0; i < count; i++) {

            const record =
                await contract.getRecord(i);

            records.push({

                temperature:
                    Number(record[0]),

                humidity:
                    Number(record[1]),

                soilMoisture:
                    Number(record[2]),

                timestamp:
                    Number(record[3])

            });
        }

        return records;

    } catch (error) {

        console.error(error.message);

        return [];
    }
};

module.exports = {
    saveToBlockchain,
    getBlockchainRecordCount,
    getAllBlockchainRecords
};