const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
    {
        temperature: {
            type: Number,
            required: true
        },

        humidity: {
            type: Number,
            required: true
        },

        soilMoisture: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "SensorData",
    sensorSchema
);