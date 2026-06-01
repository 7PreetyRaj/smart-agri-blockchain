const express = require("express");

const router = express.Router();

router.get("/sensor-data", (req, res) => {

    const sensorData = {
        temperature: Math.floor(Math.random() * 15) + 25,
        humidity: Math.floor(Math.random() * 40) + 40,
        soilMoisture: Math.floor(Math.random() * 50) + 30
    };

    res.json(sensorData);

});

module.exports = router;