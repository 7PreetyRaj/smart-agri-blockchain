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
const submitSensorData = (req, res) => {

    const sensorData = req.body;

    const isValid = validateSensorData(sensorData);

    const isDuplicate = isDuplicateData(sensorData);

    res.json({
        receivedData: sensorData,
        valid: isValid,
        duplicate: isDuplicate
    });

};
module.exports = {
    getSensorData,
    submitSensorData
};