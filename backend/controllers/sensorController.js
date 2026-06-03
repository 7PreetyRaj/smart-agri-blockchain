const {
    saveToBlockchain
} = require("../services/blockchainService");
const SensorData = require("../models/SensorData");
const {
    validateSensorData,
    isDuplicateData
} = require("../ai/dataFilter");
// Function to generate sensor data

const getSensorData = (req, res) => {

    const sensorData = {

        temperature: Math.floor(Math.random() * 70),
        humidity: Math.floor(Math.random() * 120),
        soilMoisture: Math.floor(Math.random() * 120)

    };

    const isValid = validateSensorData(sensorData);

    const isDuplicate = isDuplicateData(sensorData);

    res.json({
        sensorData,
        valid: isValid,
        duplicate: isDuplicate
    });

};
const submitSensorData = async (req, res) => {

    try {

        // Data received from API request
        const sensorData = req.body;

        // AI validation check
        const isValid =
            validateSensorData(sensorData);

        // Duplicate data check
        const isDuplicate =
            isDuplicateData(sensorData);

        // Reject invalid data
        if (!isValid) {

            return res.status(400).json({
                message: "Invalid Sensor Data",
                valid: false
            });

        }

        // Skip duplicate data
        if (isDuplicate) {

            return res.status(200).json({
                message: "Duplicate Data Skipped",
                duplicate: true
            });

        }

        // Save valid data into MongoDB
        const savedData =
            await SensorData.create(sensorData);

        // Save same data into blockchain
        const transactionHash =
            await saveToBlockchain(
                sensorData.temperature,
                sensorData.humidity,
                sensorData.soilMoisture
            );

        // Send success response
        res.status(201).json({

            message:
                "Sensor Data Saved To MongoDB And Blockchain",

            transactionHash,

            data: savedData

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
module.exports = {
    getSensorData,
    submitSensorData
};