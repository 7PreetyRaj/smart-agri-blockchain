let previousData = null;

// Intelligent data validation function

const validateSensorData = (sensorData) => {

    const {
        temperature,
        humidity,
        soilMoisture
    } = sensorData;

    // Agriculture realistic ranges

    if (temperature < 0 || temperature > 50) {
        return false;
    }

    if (humidity < 0 || humidity > 100) {
        return false;
    }

    if (soilMoisture < 0 || soilMoisture > 100) {
        return false;
    }

    return true;
};
const isDuplicateData = (currentData) => {

    if (!previousData) {
        previousData = currentData;
        return false;
    }

    const duplicate =
        previousData.temperature === currentData.temperature &&
        previousData.humidity === currentData.humidity &&
        previousData.soilMoisture === currentData.soilMoisture;

    previousData = currentData;

    return duplicate;
};
module.exports = {
    validateSensorData,
    isDuplicateData
};