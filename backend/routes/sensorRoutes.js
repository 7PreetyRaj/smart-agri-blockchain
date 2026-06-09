const express = require("express");

const router = express.Router();

const {
    getSensorData,
    submitSensorData,
    generateAndSaveSensorData
} = require("../controllers/sensorController");
const {
    getBlockchainRecords
} = require("../controllers/blockchainController");


// Generate random sensor data
router.get("/sensor-data", getSensorData);

// Submit sensor data
router.post("/sensor-data", submitSensorData);
router.post(
    "/generate-data",
    generateAndSaveSensorData
);
// Get all blockchain records
router.get(
    "/blockchain/records",
    getBlockchainRecords
);
router.get("/test", (req, res) => {
    res.json({
        message: "Test Route Working"
    });
});
module.exports = router;