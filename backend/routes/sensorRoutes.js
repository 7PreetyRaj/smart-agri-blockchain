const express = require("express");

const router = express.Router();

const {
    getSensorData,
    submitSensorData
} = require("../controllers/sensorController");

router.get("/sensor-data", getSensorData);

router.post("/sensor-data", submitSensorData);

module.exports = router;