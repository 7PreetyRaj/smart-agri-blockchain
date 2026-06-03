const {
    getAllBlockchainRecords
} = require("../services/blockchainService");


// Get all blockchain records
const getBlockchainRecords =
    async (req, res) => {

        try {

            const records =
                await getAllBlockchainRecords();

            res.json(records);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    };

module.exports = {
    getBlockchainRecords
};