const mongoose = require("mongoose");

// Schema for storing agricultural sensor data
const sensorSchema = new mongoose.Schema(
    {
        // Temperature value from sensor
        temperature: {
            type: Number,
            required: true
        },

        // Humidity value from sensor
        humidity: {
            type: Number,
            required: true
        },

        // Soil moisture value from sensor
        soilMoisture: {
            type: Number,
            required: true
        },

        // Blockchain transaction hash
        // Used as proof that data is stored on blockchain
        transactionHash: {
            type: String,
            default: null
        }
    },
    {
        // Automatically creates:
        // createdAt
        // updatedAt
        timestamps: true
    }
);

// Export model
module.exports = mongoose.model(
    "SensorData",
    sensorSchema
);