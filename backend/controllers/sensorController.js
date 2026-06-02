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

        const sensorData = req.body;

        const isValid = validateSensorData(sensorData);

        const isDuplicate = isDuplicateData(sensorData);

        // Invalid data
        if (!isValid) {
            return res.status(400).json({
                message: "Invalid Sensor Data",
                valid: false
            });
        }

        // Duplicate data
        if (isDuplicate) {
            return res.status(200).json({
                message: "Duplicate Data Skipped",
                duplicate: true
            });
        }

        // Save to MongoDB
        const savedData = await SensorData.create(sensorData);

        res.status(201).json({
            message: "Sensor Data Saved",
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